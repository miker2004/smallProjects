document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("searchButton");
    const loadMoreButton = document.getElementById("loadMoreButton");
    const gallery = document.getElementById("gallery");
    const loader = document.querySelector('.loader');

    let page = 1;
    let currentSearchTerm = '';
    let totalHits = 0;
    let displayedHits = 0;

    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();
        loader.style.opacity = 1; 
        loader.style.display = 'block'; 
        loadMoreButton.style.display = 'none'; 

        const q = searchBar.value.trim();
        if (q === '') {
            iziToast.show({
                title: 'Input Required',
                message: 'Please enter a search term.',
                color: 'yellow'
            });
            loader.style.display = 'none';
            loader.style.opacity = 0; 
            return;
        }

        if (q !== currentSearchTerm) {
            page = 1;
            currentSearchTerm = q;
            gallery.innerHTML = '';
            totalHits = 0;
            displayedHits = 0;
        }

        const orientation = "horizontal";
        const safesearch = "true";
        const apiKey = "44886630-c76369955f218994c10c946a0";
        const per_page = 40; 

        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(q)}&image_type=photo&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.hits.length === 0) {
                iziToast.show({
                    title: 'No results',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    color: 'white'
                });
            } else {
                totalHits = data.totalHits;
                displayedHits += data.hits.length;
                displayImages(data.hits);
                if (displayedHits < totalHits) {
                    loadMoreButton.style.display = 'block'; 
                } else {
                    loadMoreButton.style.display = 'none'; 
                    iziToast.show({
                        title: 'End of Results',
                        message: "We're sorry, but you've reached the end of search results.",
                        color: 'white'
                    });
                }
                page++;  
            }

            searchBar.value = ''; 
        } catch (error) {
            console.error('Error fetching data:', error);
            iziToast.show({
                title: 'Error',
                message: 'Failed to fetch images. Please try again later.',
                color: 'red'
            });
        } finally {
            loader.style.display = 'none';
            loader.style.opacity = 0; 
        }
    });

    loadMoreButton.addEventListener("click", async () => {
        if (currentSearchTerm === '') {
            iziToast.show({
                title: 'Input Required',
                message: 'Please enter a search term.',
                color: 'yellow'
            });
            return;
        }

        loader.style.opacity = 1; 
        loader.style.display = 'block'; 

        const orientation = "horizontal";
        const safesearch = "true";
        const apiKey = "44886630-c76369955f218994c10c946a0";
        const per_page = 20;

        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(currentSearchTerm)}&image_type=photo&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${per_page}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.hits.length === 0) {
                iziToast.show({
                    title: 'No results',
                    message: 'Sorry, there are no more images matching your search query.',
                    color: 'white'
                });
                loadMoreButton.style.display = 'none'; 
            } else {
                displayedHits += data.hits.length;
                displayImages(data.hits);
                if (displayedHits >= totalHits) {
                    loadMoreButton.style.display = 'none'; 
                    iziToast.show({
                        title: 'End of Results',
                        message: "We're sorry, but you've reached the end of search results.",
                        color: 'white'
                    });
                } else {
                    page++;  
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            iziToast.show({
                title: 'Error',
                message: 'Failed to fetch images. Please try again later.',
                color: 'red'
            });
        } finally {
            loader.style.display = 'none';
            loader.style.opacity = 0; 
        }
    });

    function displayImages(images) {
        const fragment = document.createDocumentFragment();
        images.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.classList.add('image-card');
            imageCard.innerHTML = `
                <a href="${image.largeImageURL}">
                    <img src="${image.webformatURL}" alt="${image.tags}">
                </a>
                <div class="image-info">
                    <p><strong>Likes:</strong> ${image.likes}</p>
                    <p><strong>Views:</strong> ${image.views}</p>
                    <p><strong>Comments:</strong> ${image.comments}</p>
                    <p><strong>Downloads:</strong> ${image.downloads}</p>
                </div>
            `;
            fragment.appendChild(imageCard);
        });

        gallery.appendChild(fragment);

        const firstImageCard = document.querySelector('.image-card');
        if (firstImageCard) {
            const { height } = firstImageCard.getBoundingClientRect();
            window.scrollBy({
                top: height * 2,
                behavior: 'smooth'
            });
        }
    }
});
