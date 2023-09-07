// JavaScript to handle page navigation
const searchLink = document.getElementById('search-link');
const favoritesLink = document.getElementById('favorites-link');
const searchPage = document.getElementById('search-page');
const favoritesPage = document.getElementById('favorites-page');
// Adding click Event listener to search link button
searchLink.addEventListener('click', () => {
    searchPage.classList.add('active');
    favoritesPage.classList.remove('active');
});

favoritesLink.addEventListener('click', () => {
    favoritesPage.classList.add('active');
    searchPage.classList.remove('active');
});

// JavaScript for meal search and favorite functionality
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const favoritesList = document.getElementById('favorites-list');
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Load favorites from localStorage
const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
storedFavorites.forEach((meal) => {
    addToFavorites(meal);
});

// Add a submit button to trigger search results
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);

// Modify the handleInput function to clear search results on input
function handleInput() {
    searchResults.innerHTML = '';
}

// Modify the searchForm event listener to prevent automatic submission on Enter
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

// Add a click event listener to the submit button to trigger the search
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        searchResults.innerHTML = '';
        return;
    }

    // Call the handleFormSubmit function to fetch and display search results
    handleFormSubmit();
}

// Function to search form
function handleFormSubmit() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        searchResults.innerHTML = '';
        return;
    }

    // Fetch function used here to fetch data from the API
    fetch(API_URL + searchTerm)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.meals) {
                displayMealResults(data.meals);
            } else {
                searchResults.innerHTML = 'No meals found.';
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            searchResults.innerHTML = 'Error fetching data. Please try again later.';
        });
}

// Display function is used here to display the meal results
function displayMealResults(meals) {
    searchResults.innerHTML = '';

    meals.forEach((meal) => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');

        const mealName = document.createElement('h2');
        mealName.textContent = meal.strMeal;

        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;

        const idMeal = document.createElement('p');
        idMeal.textContent = `Meal ID: ${meal.idMeal}`;

        const strMeal = document.createElement('p');
        strMeal.textContent = `Meal Name: ${meal.strMeal}`;

        const strDrinkAlternate = document.createElement('p');
        strDrinkAlternate.textContent = `If Alternate Drink required: ${meal.strDrinkAlternate}`;

        const strCategory = document.createElement('p');
        strCategory.textContent = `Category of Meal: ${meal.strCategory}`;

        const strArea = document.createElement('p');
        strArea.textContent = `Meal from: ${meal.strArea}`;

        const strTags = document.createElement('p');
        strTags.textContent = `Tags: ${meal.strTags}`;

        const mealInstructions = document.createElement('p');

        const showInstruction = document.createElement('button');
        showInstruction.textContent = 'Show Instruction';
        showInstruction.addEventListener('click', () => {
            mealInstructions.textContent = `${meal.strInstructions}`;
            showInstruction.hidden = true; // Disable the button after adding to favorites
        });

        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Add to Fav';
        addToFavoritesButton.addEventListener('click', () => {
            addToFavorites(meal);
            addToFavoritesButton.disabled = true; // Disable the button after adding to favorites
        });
        addToFavoritesButton.style.marginLeft = '50px';
        mealCard.appendChild(mealName);
        mealCard.appendChild(mealImage);
        mealCard.appendChild(idMeal);
        mealCard.appendChild(strMeal);
        mealCard.appendChild(strDrinkAlternate);
        mealCard.appendChild(strCategory);
        mealCard.appendChild(strArea);
        mealCard.appendChild(strTags);
        mealCard.appendChild(mealInstructions);
        mealCard.appendChild(showInstruction);
        mealCard.appendChild(addToFavoritesButton);
        searchResults.appendChild(mealCard);
    });
}
function addToFavorites(meal) {
    const listItem = document.createElement('div');
    listItem.classList.add('favorite-item');
    const idMeal = document.createElement('p');
    idMeal.textContent = `Meal ID: ${meal.idMeal}`;
    const mealName = document.createElement('h2');
    mealName.textContent = meal.strMeal;
    const strMeal = document.createElement('p');
    strMeal.textContent = `Meal Name: ${meal.strMeal}`;
    const strDrinkAlternate = document.createElement('p');
    strDrinkAlternate.textContent = `If Alternate Drink required: ${meal.strDrinkAlternate}`;
    const strCategory = document.createElement('p');
    strCategory.textContent = `Category of Meal: ${meal.strCategory}`;
    const removeFromFavoritesButton = document.createElement('button');
    removeFromFavoritesButton.textContent = 'Remove from Fav';
    removeFromFavoritesButton.addEventListener('click', () => {
        removeFromFavorites(listItem);
    });

    listItem.appendChild(idMeal);
    listItem.appendChild(mealName);
    listItem.appendChild(strMeal);
    listItem.appendChild(strDrinkAlternate);
    listItem.appendChild(strCategory);
    listItem.appendChild(removeFromFavoritesButton);
    favoritesList.appendChild(listItem);
}

function removeFromFavorites(item) {
    favoritesList.removeChild(item);
}


function removeFromFavorites(item) {
    favoritesList.removeChild(item);
}
