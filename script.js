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
        
        let checkVideoUrl = document.getElementById("player")
        let videoUrl = checkVideoUrl.src
        let checkVideoID = videoUrl.split("/")
	let extractVideoID = checkVideoID[checkVideoID.length-1].split("?")
        let videoID = extractVideoID[0]

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

    document.querySelectorAll('.keyword').forEach(function (keyword) {
        keyword.addEventListener('click', function () {
            var selectedKeyword = keyword.innerText;
            var searchInput = document.getElementById('search-input');
            searchInput.value = selectedKeyword;
        });
    
    })


    // Get all keyword labels
    const keywordLabels = document.querySelectorAll('.keyword');
    const searchButton = document.getElementById('search-button');
    const customKeywordInput = document.getElementById('custom-keyword-input');

    // Add a click event listener to each keyword label
    keywordLabels.forEach((label) => {
        label.addEventListener('click', () => {
            // Toggle the selection state of the label
            const isSelected = label.getAttribute('data-selected') === 'true';
            label.setAttribute('data-selected', isSelected ? 'false' : 'true');

            // Add or remove a class to visually indicate selection (you can customize the styles)
            if (isSelected) {
                label.classList.remove('selected');
            } else {
                label.classList.add('selected');
            }

            // Update the search input based on selected keywords
            updateSearchInput();
        });
    });

    // Function to update the search input based on selected keywords
    function updateSearchInput() {
        const selectedKeywords = Array.from(document.querySelectorAll('.keyword'))
            .filter((label) => label.getAttribute('data-selected') === 'true')
            .map((label) => label.innerText);

        const searchInput = document.getElementById('search-input');
        searchInput.value = selectedKeywords.join(', '); // You can format this as needed
    }

    // Event listener for the search button
    searchButton.addEventListener('click', () => {
        // Get the selected keywords
        const selectedKeywords = Array.from(document.querySelectorAll('.keyword'))
            .filter((label) => label.getAttribute('data-selected') === 'true')
            .map((label) => label.innerText);

        // Create a query based on selected keywords
        const query = selectedKeywords.join(' ');

        // Fetch and display videos based on the query
        fetchAndDisplayVideos(query);
    });

    // Event listener for the custom keyword search button
    const customKeywordSearchButton = document.getElementById('custom-keyword-search-button');
    customKeywordSearchButton.addEventListener('click', () => {
        // Get the custom keyword entered by the user
        const customKeyword = customKeywordInput.value;

        if (customKeyword.trim() !== '') {
            // Add the custom keyword as a selected label
            addCustomKeywordLabel(customKeyword);
        }
    });


    // Function to toggle the selection state of a keyword label
    function toggleKeywordSelection() {
        const isSelected = this.getAttribute('data-selected') === 'true';
        this.setAttribute('data-selected', isSelected ? 'false' : 'true');

        if (isSelected) {
            this.classList.remove('selected');
        } else {
            this.classList.add('selected');
        }

        updateSearchInput();
    }


    // Function to add a custom keyword label
    function addCustomKeywordLabel(keyword) {
        const keywordLabelsContainer = document.querySelector('#keywords'); 
        const customKeywordLabel = document.createElement('label'); // Define the custom keyword label
        customKeywordLabel.className = 'keyword selected';
        customKeywordLabel.innerText = keyword;
        customKeywordLabel.setAttribute('data-selected', 'true');
        customKeywordLabel.addEventListener('click', toggleKeywordSelection);

        // Append the custom keyword label to the existing keyword container
        keywordLabelsContainer.appendChild(customKeywordLabel);

        // Update the search input based on selected keywords
        updateSearchInput();
    }

    // Define a function to fetch and display videos based on a query
    function fetchAndDisplayVideos(query) {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${query}&type=video&videoDuration=short&key=AIzaSyBQq7MpU8_NqDC34ujWCWMtOWnqrGhOErA`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Update the video container with the new videos
                updateVideoContainer(data.items);
            });
    }

    // Function to update the video container with new videos
    function updateVideoContainer(videos) {
        const videoContainer = document.querySelector(".video-container .row");
        videoContainer.innerHTML = '';

        for (const video of videos) {
            videoContainer.innerHTML += `
                <div class="col-md-4 test-col">
                    <a href="iFrame.html?videoID=${video.id.videoId}" class="youtube-link">
                        <img src="${video.snippet.thumbnails.high.url}" alt="Youtube Thumbnail">
                        <h5 class="youtube-title">${video.snippet.title}</h5>    
                        <p class="youtube-channel">${video.snippet.channelTitle}</p>
                    </a>
                </div>
            `;
        }
    }

    // Event listener for the search button
    document.querySelector('#search-button').addEventListener('click', () => {
        // Get the selected keywords
        const selectedKeywords = Array.from(document.querySelectorAll('.keyword'))
            .filter((label) => label.getAttribute('data-selected') === 'true')
            .map((label) => label.innerText);

        // Create a query based on selected keywords
        const query = selectedKeywords.join(' ');

        // Fetch and display videos based on the query
        fetchAndDisplayVideos(query);
    });

    // Initial fetch and display based on the URL query
    const queryString = new URLSearchParams(window.location.search).get("query");
    if (queryString) {
        fetchAndDisplayVideos(queryString);
    }


})

