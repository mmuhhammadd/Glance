(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const xhr = new XMLHttpRequest();
    const xhr1 = new XMLHttpRequest();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // Sending an ajax request to unsplash
        xhr.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        xhr.setRequestHeader('Authorization', 'Client-ID mXIkvr8NyEKkmVooj78DYyPS5ZIvtPc-9v2Ye1GhIpM');
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            if (data && data.results && data.results[0])
            {
                const imgFigure =
                `
                <figure>
                    <img src="${data.results[0].urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} image by ${data.results[0].user.name}</figcaption>
                </figure>
                `;
                responseContainer.insertAdjacentHTML("afterbegin", imgFigure);
            }
        };
        xhr.send();

        // Sending an ajax request to new york times
        xhr1.open('GET', 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+searchedForText+'&api-key=cbFNI64D5QpKWcJPNXHGUFSjQziKUK9c');
        xhr1.onload = () => {
            const data = JSON.parse(xhr1.responseText);
            if (data.response.docs && data.response.docs.length > 1)
            {
                const fragment = document.createDocumentFragment();
                data.response.docs.forEach(article => {
                    const listitem =  document.createElement('li');
                    listitem.innerHTML = `
                    <h2><a href=${article.web_url} style="text-decoration: underline; color: #2e3d49;">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                    `
                    fragment.appendChild(listitem);
                    listitem.style.border = "1px solid #2e3d49;";
                })
                const list = document.createElement('ul');
                list.appendChild(fragment);
                responseContainer.appendChild(list)
            }
        }
        xhr1.send();
    });
})();
