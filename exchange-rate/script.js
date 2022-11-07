/*
  - getElementById와 querySelector의 반환값은 각각 HTMLCollection과 NodeList로 서로 다르다.
  - getElementById를 사용했을 때 처리하는 속도가 더 빠르다.
  - querySelector는 다양한 선택자를 사용할 수 있다는 점에서 편리하다.
*/
var $currencyOne = document.getElementById('currency-one') || null;
var $currencyTwo = document.getElementById('currency-two') || null;
var $amountOne = document.getElementById('amount-one') || null;
var $amountTwo = document.getElementById('amount-two') || null;
var $rate = document.getElementById('rate') || null;
var $swap = document.getElementById('swap') || null;
// Fetch exchange rates and update the DOM
function calculate() {
    // select로 통화명 선택
    // Object is possibly 'null' error 발생. 옵셔널체이닝 적용
    // (<HTMLInputElement | null>document.getElementById("myInput"))?.value;
    var currencyOneVal = $currencyOne === null || $currencyOne === void 0 ? void 0 : $currencyOne.value;
    var currencyTwoVal = $currencyTwo === null || $currencyTwo === void 0 ? void 0 : $currencyTwo.value;
    // fetch api로 선택한 통화 api GET
    fetch("https://v6.exchangerate-api.com/v6/c567d99f35a0071f05e41e34/latest/".concat(currencyOneVal))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var rate = data.conversion_rates[currencyTwoVal];
        $rate.innerText = "1 ".concat(currencyOneVal, " = ").concat(rate, " ").concat(currencyTwoVal);
        $amountTwo.value = (+($amountOne === null || $amountOne === void 0 ? void 0 : $amountOne.value) * rate).toFixed(2);
    });
}
// Event listeners
$currencyOne.addEventListener('change', calculate);
$currencyTwo.addEventListener('change', calculate);
$amountOne.addEventListener('input', calculate);
$amountTwo.addEventListener('input', calculate);
// swap 버튼 클릭 시 통화 서로 변경
$swap.addEventListener('click', function () {
    var temp = $currencyOne.value;
    $currencyOne.value = $currencyTwo.value;
    $currencyTwo.value = temp;
    calculate();
});
calculate();
