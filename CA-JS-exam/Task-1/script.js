/* ------------------------------ TASK 1 ----------------------------
Parašykite JS kodą, kuris leis vartotojui įvesti svorį kilogramais ir
pamatyti jo pateikto svorio kovertavimą į:
1. Svarus (lb) | Formulė: lb = kg * 2.2046
2. Gramus (g) | Formulė: g = kg / 0.0010000
3. Uncijos (oz) | Formul4: oz = kg * 35.274

Pastaba: atvaizdavimas turi būti matomas pateikus formą ir pateikiamas
<div id="output"></div> viduje, bei turi turėti bent minimalų stilių;
------------------------------------------------------------------- */

const form = document.querySelector("form");
const poundsElement = document.createElement("p");
const gramsElement = document.createElement("p");
const ozElement = document.createElement("p");

const weightConverter = (event) => {
  event.preventDefault();

  const userInputValue = +document.querySelector("#search").value;
  const output = document.querySelector("#output");

  const calculateWeightInPounds = userInputValue * 2.2046;
  const calculateWeightInGrams = userInputValue / 0.001;
  const calculateWeightInOz = userInputValue * 35.274;

  if (userInputValue) {
    poundsElement.textContent = `Your weight in Pounds is: ${calculateWeightInPounds} lb`;
    gramsElement.textContent = `Your weight in Grams is: ${calculateWeightInGrams} g`;
    ozElement.textContent = `Your weight in Oz is: ${calculateWeightInOz} oz`;

    output.append(poundsElement, gramsElement, ozElement);
  } else {
    alert("Please input only numbers");
  }
};

form.addEventListener("submit", weightConverter);
