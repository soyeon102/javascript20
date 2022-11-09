const $search = document.getElementById('search'),
  $submit = document.getElementById('submit'),
  $random = document.getElementById('random'),
  $meals = document.getElementById('meals'),
  $resultHeading = document.getElementById('result-heading'),
  $singleMeal = document.getElementById('single-meal');

// 검색창에 입력한 단어로 API 호출
function searchMeal(e) {
  e.preventDefault();

  // single meal HTML 초기화
  $singleMeal.innerHTML = '';

  // 검색어 입력
  const term = $search.value;
  console.log(term);

  // 검색어가 비어있지 않은 경우 확인
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.meals);
        $resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

        if (data.meals === null) {
          $resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          $meals.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class='meal'>
                <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
                <div class='meal-info' data-mealId='${meal.idMeal}'}>
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>`
            )
            .join('');
        }
      });
    // 검색어 초기화
    $search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// ID로 상세 페이지 API 호출
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// 랜덤으로 가져오는 API 호출
function getRandomMeal() {
  // Clear meals and heading
  $meals.innerHTML = '';
  $resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// DOM에 meal 추가하기
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  $singleMeal.innerHTML = `
  <div class='single-meal'>
    <h1>${meal.strMeal}</h1>
    <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
    <div class='single-meal-info'>
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class='main'>
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

// Event listeners
$submit.addEventListener('submit', searchMeal);
$random.addEventListener('click', getRandomMeal);
$meals.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealid');
    console.log(mealId);
    getMealById(mealId);
  }
});
