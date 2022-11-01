/* ------------------------------ TASK 4 -----------------------------------
Parašykite JS kodą, vartotojui atėjus į tinklapį kreipsis į cars.json failą
ir iš atvaizduos visus automobilių gamintojus ir pagamintus modelius. 
Kiekvienas gamintojas turės savo atvaizdavimo "kortelę", kurioje bus 
nurodomas gamintojas ir jo pagaminti modeliai.


Pastaba: Sukurta kortelė, kurioje yra informacija apie automobilį (brand), turi 
turėti bent minimalų stilių ir būti responsive;
-------------------------------------------------------------------------- */

const ENDPOINT = "cars.json";

const getCars = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const cars = await response.json();

    return cars;
  } catch (error) {
    console.error(error);
  }
};

const createCarBrandCard = (car) => {
  const carsContainer = document.createElement("div");
  carsContainer.setAttribute("class", "carsContainer");

  const carBrandElement = document.createElement("h2");
  carBrandElement.setAttribute("class", "carBrand");
  carBrandElement.innerText = car.brand;

  carsContainer.append(carBrandElement);

  const carModelsContainer = document.createElement("div");
  carModelsContainer.setAttribute("class", "carModelsContainer");

  const models = car.models.sort((a, b) => a.localeCompare(b));

  models.forEach((model) => {
    const carModelElement = document.createElement("p");
    carModelElement.setAttribute("class", "carModel");

    carModelElement.innerText = model;
    carModelsContainer.append(carModelElement);
  });

  carsContainer.append(carModelsContainer);

  document.querySelector("#output").append(carsContainer);
};

const renderCarBrandCard = async () => {
  const cars = await getCars();
  const sortedCars = cars.sort((a, b) => (a.brand > b.brand ? 1 : -1));

  document.querySelector("#output").replaceChildren();

  sortedCars.forEach((car) => createCarBrandCard(car));
};

await renderCarBrandCard();
