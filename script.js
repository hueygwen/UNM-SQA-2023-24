fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=Software%20Quality%20Assurance&type=video&videoDuration=short&key=AIzaSyBQq7MpU8_NqDC34ujWCWMtOWnqrGhOErA")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data)
    let videos = data.items
    let videoContainer = document.querySelector(".test-container .row")
    
    for(video of videos) {
        
        videoContainer.innerHTML += `
            
            <div class="col-md-4 test-col">
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" class="youtube-link" target="_blank">
            <img src="${video.snippet.thumbnails.high.url}" alt="Youtube Thumbnail">
            <h5 class="youtube-title">${video.snippet.title}</h5>    
            <p class="youtube-channel">${video.snippet.channelTitle}</p>
            </a>
            </div>`
    }
})
