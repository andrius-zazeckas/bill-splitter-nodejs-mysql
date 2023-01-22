import { addBill } from "./addBill.js";
import { getBills } from "./getBills.js";

const renderBills = async () => {
  const bills = await getBills();

  if (!bills) {
    return;
  }

  if (bills.error) {
    return;
  }

  const currency = "$";

  const textContainer = document.querySelector("#text-container");
  textContainer.replaceChildren();
  textContainer.style = "margin: 40px";

  if (!bills.length) {
    const noDataEl = document.createElement("h2");
    noDataEl.textContent = "There is no bills assigned to this group";

    return textContainer.append(noDataEl);
  }

  const headEl = document.createElement("h1");
  headEl.textContent = "Group's bills:";

  textContainer.append(headEl);

  const sectionContainer = document.querySelector("#bills");
  sectionContainer.replaceChildren();

  const billsContainer = document.createElement("div");
  billsContainer.id = "bills-container";

  const billsTableEl = document.createElement("table");
  billsTableEl.id = "bills-table";

  const tbodyEl = document.createElement("tbody");
  tbodyEl.id = "tbody";

  const tableRowEl = document.createElement("tr");
  const thIdEl = document.createElement("th");
  const thDescriptionEl = document.createElement("th");
  const thAmountEl = document.createElement("th");

  thIdEl.textContent = "ID";
  thDescriptionEl.textContent = "Description";
  thAmountEl.textContent = "Amount";

  tableRowEl.append(thIdEl, thDescriptionEl, thAmountEl);
  tbodyEl.append(tableRowEl);
  billsTableEl.append(tbodyEl);

  billsContainer.append(billsTableEl);

  bills.forEach((bill) => {
    const { id, amount, description } = bill;

    const rowEl = document.createElement("tr");

    const idEl = document.createElement("td");
    const descriptionEl = document.createElement("td");
    const amountEl = document.createElement("td");

    idEl.textContent = id;
    descriptionEl.textContent = description;
    amountEl.textContent = `${currency}${amount}`;

    rowEl.append(idEl, descriptionEl, amountEl);
    tbodyEl.append(rowEl);
  });
  sectionContainer.append(billsContainer);
};

await renderBills();

document.body
  .querySelector("#add-bill-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    await addBill();
  });
