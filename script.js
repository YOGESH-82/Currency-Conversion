const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";




  
// All Country Code
// for(a in countryList){
//   console.log(a,countryList[a]);
// }

let DropDown = document.querySelectorAll(".bothDropDown select");

let btn = document.querySelector("form button");

let fromCur = document.querySelector(".from select");

let toCur = document.querySelector(".to select");

let msg = document.querySelector(".info");

for (let select of DropDown) {
  for (code in countryList) {
    let option = document.createElement("option");
    option.innerText = code;
    option.value = code;
    // console.log(option)

    if (select.name === "selFrom" && code === "USD") {
      option.selected = "selected";
    } else if (select.name === "selTo" && code === "INR") {
      option.selected = "selected";
    }

    select.append(option);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// const updateFlag= (element)=>{
//   console.log(element);
// }
//OR
function updateFlag(item) {
  // console.log(item.value)
  let currencyCode = item.value;
  let countryCode = countryList[currencyCode];
  // console.log(countryCode);

  let newimgURL = `https://flagsapi.com/${countryCode}/shiny/64.png`;

  // console.log(item)
  let setImage = item.parentElement.querySelector("img");

  // console.log(setImage.src);
  setImage.src = newimgURL;
  // console.log(setImage.src);
}

window.addEventListener("load", (e) => {
  updateExchangeRate();
})

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  // console.log(amount.value)
  let amtValue = amount.value;

  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = amtValue;
  }
  // console.log(amtValue)

  const URL = `${BASE_URL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
  // console.log(fromCur.value);
  // console.log(toCur.value);

  let reponse = await fetch(URL);
  let data = await reponse.json();
  let rate = data[toCur.value.toLowerCase()];

  let finalAmount = amtValue * rate;

  msg.innerText = `${amtValue} ${fromCur.value}  =  ${finalAmount} ${toCur.value}`;
}



btn.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("i am Clicked")
  updateExchangeRate();  
});
