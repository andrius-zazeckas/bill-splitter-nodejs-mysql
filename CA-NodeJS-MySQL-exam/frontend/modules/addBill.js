const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const group_id = urlParams.get("group_id");

const addBill = async () => {
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

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      window.location.reload();
    }

    if (!response.ok || response.status >= 400) {
      alert(data.error || data.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
};

export { addBill };
