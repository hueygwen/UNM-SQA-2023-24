fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=Software%20Quality%20Assurance&type=video&videoDuration=short&key=AIzaSyCeWB_UtM_jMkxmWgk5OJjxhXEVUzfrGYU")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data)
    let videos = data.items
    let videoContainer = document.querySelector(".video-container .row")
    var video
    
    for(video of videos) {
        
        videoContainer.innerHTML += `
            
            <div class="col-md-4 test-col">
                <a href="iFrame.html?videoID=${video.id.videoId}" class="youtube-link">
                <img src="${video.snippet.thumbnails.high.url}" alt="Youtube Thumbnail">
                <h5 class="youtube-title">${video.snippet.title}</h5>    
                <p class="youtube-channel">${video.snippet.channelTitle}</p>
                </a>
            </div>
        `
        

    }
})



document.addEventListener("DOMContentLoaded", function () {
    let videoUrl = window.location.search;
    let urlArray = videoUrl.split('=');
    let videoID = urlArray[1];
    console.log(videoID);

    let playVideo = document.querySelector('iframe');
    playVideo.src = `https://www.youtube.com/embed/${videoID}`;

    // Function to copy the page link to the clipboard
    function copyPageLinkToClipboard() {
        const pageLink = window.location.href;

        // Create a temporary input element to hold the page link
        const tempInput = document.createElement("input");
        tempInput.value = pageLink;
        document.body.appendChild(tempInput);

        // Select the input element's content and copy it to the clipboard
        tempInput.select();
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        // Display a notification that the link has been copied
        alert("Page link copied to clipboard!");
    }

    // Add an event listener to the "Copy" button
    const copyLinkBtn = document.getElementById("copy-link-btn");
    copyLinkBtn.addEventListener("click", copyPageLinkToClipboard);
});


