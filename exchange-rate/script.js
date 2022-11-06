/* 
  - getElementById와 querySelector의 반환값은 각각 HTMLCollection과 NodeList로 서로 다르다.
  - getElementById를 사용했을 때 처리하는 속도가 더 빠르다.
  - querySelector는 다양한 선택자를 사용할 수 있다는 점에서 편리하다.
*/
const $currencyOne = document.getElementById('currency-one');
const $currencyTwo = document.getElementById('currency-two');
const $amountOne = document.getElementById('amount-one');
const $amountTwo = document.getElementById('amount-two');
const $rate = document.getElementById('rate');
const $swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  // select로 통화명 선택
  const currencyOneVal = $currencyOne.value;
  const currencyTwoVal = $currencyTwo.value;

  // fetch api로 선택한 통화 api GET
  fetch(
    `https://v6.exchangerate-api.com/v6/c567d99f35a0071f05e41e34/latest/${currencyOneVal}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currencyTwoVal];
      $rate.innerText = `1 ${currencyOneVal} = ${rate} ${currencyTwoVal}`;

      $amountTwo.value = ($amountOne.value * rate).toFixed(2);
    });
}

// Event listeners
$currencyOne.addEventListener('change', calculate);
$currencyTwo.addEventListener('change', calculate);
$amountOne.addEventListener('input', calculate);
$amountTwo.addEventListener('input', calculate);

// swap 버튼 클릭 시 통화 서로 변경
$swap.addEventListener('click', () => {
  const temp = $currencyOne.value;
  $currencyOne.value = $currencyTwo.value;
  $currencyTwo.value = temp;
  calculate();
});

calculate();
