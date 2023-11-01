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
