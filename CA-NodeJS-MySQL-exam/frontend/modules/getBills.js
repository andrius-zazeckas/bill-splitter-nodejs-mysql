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
      return bills.error;
    }

    if (response.ok) {
      return bills;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getBills };
