document.getElementById('search-btn').addEventListener('click', function() {
    const keyword = document.getElementById('search-input').value;
    searchDramas(keyword);
});

async function searchDramas(keyword) {
    const response = await fetch(`/search?name=${encodeURIComponent(keyword)}&page=1`);
    const data = await response.json();
    displayResults(data);
}

function displayResults(data) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Clear previous results
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.textContent = item.name;
        div.onclick = () => saveAndShareFile(item.url);
        container.appendChild(div);
    });
}

async function saveAndShareFile(url) {
    const response = await fetch('/api/save-and-share', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });
    const data = await response.json();
    const shareLink = data.shareLink;
    displayShareLink(shareLink);
    appendToFile(url, shareLink);
}

function displayShareLink(shareLink) {
    const linkDiv = document.createElement('div');
    linkDiv.className = 'share-link';
    linkDiv.textContent = 'Share Link: ' + shareLink;
    document.body.appendChild(linkDiv);
}

async function appendToFile(url, shareLink) {
    await fetch('/api/append-to-file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, shareLink })
    });
}
