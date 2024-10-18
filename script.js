const apiUrl = 'https://kuoapp.com/duanju/api.php';
let currentPage = 1;
let totalPages = 0;

function displayResults(data) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // 清空之前的搜索结果

    data.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <img src="${item.cover}" alt="${item.name}">
            <div class="result-info">
                <h3>${item.name}</h3>
                <p>集数: ${item.episodes}</p>
                <a href="${item.url}" target="_blank">查看详情</a>
            </div>
        `;
        container.appendChild(resultItem);
    });
}

function updatePaginationInfo() {
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function updatePaginationButtons() {
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    if (currentPage === 1) {
        prevPageBtn.disabled = true;
    } else {
        prevPageBtn.disabled = false;
    }

    if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
    } else {
        nextPageBtn.disabled = false;
    }
}

function fetchResults(keyword, page) {
    fetch(`${apiUrl}?param=1&name=${encodeURIComponent(keyword)}&page=${page}`)
        。then(response => response.json())
        。then(data => {
            totalPages = data.totalPages;
            displayResults(data.data);
            updatePaginationInfo();
            updatePaginationButtons();
        })
        。catch(error => console.error('Error fetching data:', error));
}

document.getElementById('search-btn').addEventListener('click', () => {
    const keyword = document.getElementById('search-input').value;
    currentPage = 1; // 重置当前页码
    fetchResults(keyword, currentPage);
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        const keyword = document.getElementById('search-input').value;
        fetchResults(keyword, currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        const keyword = document.getElementById('search-input').value;
        fetchResults(keyword, currentPage);
    }
});
