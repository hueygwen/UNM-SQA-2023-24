// Function to get video ID from URL
function getVideoIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('videoID'); // Replace 'videoId' with the actual parameter name in your URL
}
  
  // Retrieve the current video ID
  const currentVideoId = getVideoIdFromUrl();
  console.log('Current Video ID:', currentVideoId);
  
  // Initialize notes from localStorage for the current video
  let notes = JSON.parse(localStorage.getItem(`notes-${currentVideoId}`)) || [];
  console.log(`Notes for video ${currentVideoId}:`, notes); //ERROR
  
  // Display saved notes on page load for the current video
  displayNotes();
  
  document.getElementById("add-note-btn").addEventListener("click", function() {
      const noteText = document.getElementById("note-input").value.trim();
      const noteTimestamp = document.getElementById("note-timestamp").value.trim(); // Default value if not provided
  
      if (noteText) {
          const note = {
              text: noteText,
              timestamp: noteTimestamp
          };
          notes.push(note);
  
          saveNotesToLocalStorage();
  
          displayNote(note);
  
          document.getElementById("note-input").value = "";
          document.getElementById("note-timestamp").value = "";
      } else {
          alert("Please enter a note!");
      }
  });
  
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
      deleteBtn.addEventListener('click', function() {
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
  
