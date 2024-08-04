document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    function fetchImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Images data:', data); // Debug log
                const images = data.message;
                const imgContainer = document.getElementById('dog-image-container');
                imgContainer.innerHTML = ''; // Clear any existing images

                images.forEach(url => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = 'A dog image';
                    img.style.width = '200px'; // Set a fixed size for better display
                    img.style.margin = '10px'; // Add some margin between images
                    imgContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    function fetchBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Breeds data:', data); // Debug log
                const breeds = Object.keys(data.message);
                const breedList = document.getElementById('dog-breeds');
                const breedDropdown = document.getElementById('breed-dropdown');

                function updateBreedList(filter = '') {
                    breedList.innerHTML = ''; // Clear existing list items
                    breeds
                        .filter(breed => breed.startsWith(filter))
                        .forEach(breed => {
                            const li = document.createElement('li');
                            li.textContent = breed;
                            li.style.cursor = 'pointer'; // Indicate that it's clickable
                            li.addEventListener('click', () => {
                                li.style.color = 'red'; // Change color on click
                            });
                            breedList.appendChild(li);
                        });
                }

                breedDropdown.addEventListener('change', () => {
                    const filterValue = breedDropdown.value;
                    updateBreedList(filterValue);
                });

                // Initial display of breeds
                updateBreedList();
            })
            .catch(error => console.error('Error fetching breeds:', error));
    }

    fetchImages();
    fetchBreeds();
});
