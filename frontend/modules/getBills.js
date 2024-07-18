const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const group_id = urlParams.get("group_id");

const getBills = async () => {
  try {
    const response = await fetch(`http://localhost:5000/bills/${group_id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const bills = await response.json();

    if (!response.ok || response.status >= 400) {
      if (bills.error === "User unauthorised") {
        alert(bills.error);

        return window.location.assign(`./login.html`);
      }

      return alert(bills.error || bills.statusText);
    }

    if (response.ok) {
      return bills;
    }
  } catch (error) {
    alert(error.message);
  }
};

export { getBills };
