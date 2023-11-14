fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=Software%20Quality%20Assurance&type=video&videoDuration=short&key=AIzaSyBQq7MpU8_NqDC34ujWCWMtOWnqrGhOErA")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data)
    let videos = data.items
    let videoContainer = document.querySelector(".video-container .row")
    var video
    
    var pathName = window.location.pathname
    var pageName = pathName.split("/")

    let suggestContainer = document.querySelector(".suggest-col")
    
    if (pageName.includes("Home.html")) {
        for(video of videos) {
        
            videoContainer.innerHTML += `
                
                <div class="col-md-4 test-col">
                    <a href="iFrame.html?videoID=${video.id.videoId}" class="youtube-link">
                    <img src="${video.snippet.thumbnails.high.url}" alt="Youtube Thumbnail" class="youtube-thumbnail">
                    <h5 class="youtube-title">${video.snippet.title}</h5>    
                    <p class="youtube-channel">${video.snippet.channelTitle}</p>
                    </a>
                </div>
            `
        }

    } else if (pageName.includes("iFrame.html")) {
        let checkVideoUrl = document.querySelector("iframe")
        let videoUrl = checkVideoUrl.src
        let checkVideoID = videoUrl.split("/")
        let videoID = checkVideoID[checkVideoID.length - 1]

        console.log(videoID)

        for(video of videos) {

            if (videoID == `${video.id.videoId}`) {
                /* video.length + 1 */
                continue
            }

            suggestContainer.innerHTML += `

                <a href="iFrame.html?videoID=${video.id.videoId}">
                    <div class="row g-3 suggest-video-row">
                        <div class="col-4">
                            <img src="${video.snippet.thumbnails.high.url}" alt="Youtube Thumbnail" class="youtube-thumbnail">
                        </div>

                        <div class="col-8">
                            <h5 class="suggest-title">${video.snippet.title}</h5>
                            <p class="suggest-channel">${video.snippet.channelTitle}</p>
                        </div>
                    </div>
                </a>
                 
            `
        }
    }
    
})


document.addEventListener("DOMContentLoaded", function () {
    let videoUrl = window.location.search;
    let urlArray = videoUrl.split('=');
    let videoID = urlArray[1];
    console.log(videoID);

    let playVideo = document.querySelector('iframe');
    playVideo.src = `https://www.youtube.com/embed/${videoID}`;

    document.getElementById("copy-link-btn").onclick = function() {copyPageLinkToClipboard()};


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

});



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
        const tempInput = document.createElement("input");
        tempInput.value = pageLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Page link copied to clipboard!");
    }

    // Function to share the page link on WhatsApp
    function sharePageLinkOnWhatsApp() {
        const pageLink = window.location.href;
        const whatsappLink = `whatsapp://send?text=${encodeURIComponent(pageLink)}`;
        window.location.href = whatsappLink;
    }


    // Function to share the page link on Telegram
    function sharePageLinkOnTelegram() {
        const pageLink = window.location.href;
        const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(pageLink)}`;
        window.open(telegramLink, "Telegram Share", "width=600,height=400");
    }



    const shareLinkBtn = document.getElementById("share-link-btn");
    const shareModal = document.getElementById("share-modal");

    // Show the share modal when the "Share Link" button is clicked
    shareLinkBtn.addEventListener("click", function () {
        shareModal.style.display = "block";
    });

    // Hide the share modal when any button inside the modal is clicked
    const modalButtons = document.querySelectorAll("#share-modal button");
    modalButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            shareModal.style.display = "none";
        });
    });


    // Hide the share modal when the close button is clicked
    const closeModalBtn = document.getElementById("close-modal-btn");
    closeModalBtn.addEventListener("click", function () {
        shareModal.style.display = "none";
    });


    // Add event listeners to the share buttons
    const whatsappShareBtn = document.getElementById("whatsapp-share-btn");
    whatsappShareBtn.addEventListener("click", sharePageLinkOnWhatsApp);

    const telegramShareBtn = document.getElementById("telegram-share-btn"); // Add this line
    telegramShareBtn.addEventListener("click", sharePageLinkOnTelegram); 

});
