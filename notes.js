var player; // This will hold the YouTube player object
let playerReady = false;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Function to get video ID from URL
function getVideoIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('videoID');
}

// Retrieve the current video ID
const currentVideoId = getVideoIdFromUrl();
console.log('Current Video ID:', currentVideoId);

// Initialize notes from localStorage for the current video
let notes = JSON.parse(localStorage.getItem(`notes-${currentVideoId}`)) || [];
console.log(`Notes for video ${currentVideoId}:`, notes);

// Display saved notes on page load for the current video
displayNotes();

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
      height: '540',
      width: '960',
      videoId: currentVideoId,
      events: {
          'onReady': onPlayerReady,
      }
  });

  console.error('id not retrieved.');
}

function onPlayerReady(event) {
  playerReady = true;
  event.target.playVideo();
}

function getCurrentVideoTime() {
  if (player && player.getCurrentTime && playerReady) {
    return player.getCurrentTime();
  } else {
    console.error('YouTube Player is not ready or not available.');
    return 0; // Return 0 as a safe default
  }
}

document.getElementById("add-note-btn").addEventListener("click", function () {
  const noteText = document.getElementById("note-input").value.trim();
  const noteTimestamp = getCurrentVideoTime();

  const formattedTimestamp = formatTime(noteTimestamp);

  if (noteText) {
    const note = {
      text: noteText,
      timestamp: formattedTimestamp
    };
    notes.push(note);

    saveNotesToLocalStorage();

    displayNote(note);

    document.getElementById("note-input").value = "";
  } else {
    alert("Please enter a note!");
  }
});

function formatTime(seconds) {
  if (isNaN(seconds)) {
    // If seconds is not a number, log an error and return a default value
    console.error('Invalid time value:', seconds);
    return '0:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


function saveNotesToLocalStorage() {
  localStorage.setItem(`notes-${currentVideoId}`, JSON.stringify(notes));
  console.log(`Notes saved for video ${currentVideoId}:`, notes); //ERROR
}

function displayNotes() {
  // Clear existing notes from display to prevent duplicates
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = '';

  // Append notes to the list
  notes.forEach(note => displayNote(note));
}

function displayNote(note) {
  const notesList = document.getElementById("notes-list");
  const noteItem = document.createElement("li");
  noteItem.innerText = `[${note.timestamp}] - ${note.text}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-note-btn";
  deleteBtn.addEventListener('click', function () {
    // Remove the note from the list in the UI
    notesList.removeChild(noteItem);

    // Remove the note from the array
    const noteIndex = notes.findIndex(n => n.text === note.text && n.timestamp === note.timestamp);
    if (noteIndex > -1) {
      notes.splice(noteIndex, 1);
    }

    // Update local storage
    saveNotesToLocalStorage();
  });

  noteItem.appendChild(deleteBtn);
  notesList.appendChild(noteItem);
}

displayNotes();