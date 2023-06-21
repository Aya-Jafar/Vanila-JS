const searchInput = document.getElementById('search');
const mealListElement = document.getElementById("meal-list");

let activeMealContainer = null;
const mealInfo = document.getElementById('single-meal');


searchInput.addEventListener('keyup', (event) => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        mealListElement.innerHTML = '';
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.meals);

            mealListElement.innerHTML = '';

            data.meals.forEach(meal => {
                const mealContainer = document.createElement("div");
                mealContainer.classList.add("meal-container");

                const mealNameElement = document.createElement("p");
                mealNameElement.classList.add("meal-name");
                mealNameElement.innerText = meal.strMeal;

                const mealImageElement = document.createElement("img");
                mealImageElement.classList.add("meal-image");
                mealImageElement.src = meal.strMealThumb;

                mealContainer.appendChild(mealNameElement);
                mealContainer.appendChild(mealImageElement);

                mealListElement.appendChild(mealContainer);

                mealContainer.addEventListener('click', () => {
                    // Check if active container exists and is not the clicked container
                    if (activeMealContainer && activeMealContainer !== mealContainer) {
                        activeMealContainer.classList.remove('active');
                        const mealInfo = activeMealContainer.querySelector('.meal-info');
                        if (mealInfo) {
                            mealInfo.remove();
                        }
                        activeMealContainer = null;
                    }
                    else if (activeMealContainer === mealContainer) {
                        // If same container clicked again, disable active state and remove meal info
                        activeMealContainer.classList.remove('active');
                        const mealInfo = activeMealContainer.querySelector('.meal-info');
                        if (mealInfo) {
                            mealInfo.remove();
                        }
                        activeMealContainer = null;
                    }
                    else {
                        // Set current container as active
                        activeMealContainer = mealContainer;
                        mealContainer.classList.add('active');
                        // Create meal info element 
                        getMealInfo(meal, mealContainer);
                    }
                });
            });
        })
        .catch((error) => {
            const noMeals = document.getElementById('null');
            noMeals.innerText = 'No results found';
        });
});


const rmb = document.getElementById('random-meal-btn');
rmb.addEventListener('click',()=>{
    mealListElement.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            getRandomMeal(data);
        });
    
});

function getMealInfo(meal, mealContainer) {
    const mealInfoElement = document.createElement("div");
    mealInfoElement.classList.add('meal-info');
    mealInfoElement.innerHTML = `
            <h3>${meal.strArea}</h3>
            <p id="tags">${(meal.strTags == null) ? '' : meal.strTags}</p>
            <p>${meal.strInstructions}</p>
    `;
    mealContainer.appendChild(mealInfoElement);
}


function getRandomMeal(data) {
    const meal = data.meals[0];
    const mealContainer = addMeal(meal);

    mealContainer.addEventListener("click",()=>{
        getMealInfo(meal,mealContainer);
    })
}

function addMeal(meal) {
    const mealContainer = document.createElement("div");
    mealContainer.classList.add("meal-container");

    const mealNameElement = document.createElement("p");
    mealNameElement.classList.add("meal-name");
    mealNameElement.innerText = meal.strMeal;

    const mealImageElement = document.createElement("img");
    mealImageElement.classList.add("meal-image");
    mealImageElement.src = meal.strMealThumb;

    mealContainer.appendChild(mealNameElement);
    mealContainer.appendChild(mealImageElement);

    mealListElement.appendChild(mealContainer);
    return mealContainer;
}

