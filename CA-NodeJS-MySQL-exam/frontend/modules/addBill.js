const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const group_id = urlParams.get("group_id");

const addBill = async () => {
  const billForm = document.querySelector("#add-bill-form");

  const amountInputValue = document
    .querySelector("#bill-amount-input")
    .value.trim();
  const descriptionInputValue = document
    .querySelector("#bill-description-input")
    .value.trim();

  const newBill = JSON.stringify({
    group_id: +group_id,
    amount: +amountInputValue,
    description: descriptionInputValue,
  });

  try {
    const response = await fetch("http://localhost:5000/bills", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: newBill,
    });

    const billData = await response.json();

    if (response.ok) {
      billForm.reset();

      alert(billData.message);

      return window.location.reload();
    }

    if (!response.ok || response.status >= 400) {
      return alert(billData.error || billData.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
};

export { addBill };
