// Initialize notes from localStorage or set to empty array if not available
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Display saved notes on page load
displayNotes();

document.getElementById("add-note-btn").addEventListener("click", function() {
    const noteText = document.getElementById("note-input").value.trim();
    const noteTimestamp = document.getElementById("note-timestamp").value.trim(); // Default value if not provided

    if (noteText) {
        // Create note object and add to notes array
        const note = {
            text: noteText,
            timestamp: noteTimestamp
        };
        notes.push(note);

        // Save to localStorage
        saveNotesToLocalStorage();

        // Append to list
        displayNote(note);

        // Clear the input
        document.getElementById("note-input").value = "";
        document.getElementById("note-timestamp").value = "";
    } else {
        alert("Please enter a note!");
    }

});


function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(localStorage.getItem("notes"));
}

function displayNotes() {
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
        notesList.removeChild(noteItem);
        const noteIndex = notes.findIndex(n => n.text === note.text && n.timestamp === note.timestamp);
        if (noteIndex > -1) {
            notes.splice(noteIndex, 1);
        }

        // Update localStorage
        saveNotesToLocalStorage();
    });

    noteItem.appendChild(deleteBtn);
    notesList.appendChild(noteItem);
}