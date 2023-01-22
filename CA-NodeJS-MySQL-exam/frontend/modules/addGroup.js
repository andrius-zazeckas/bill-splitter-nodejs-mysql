const addGroup = async () => {
  const groupInputValue = document.querySelector("#group-input").value.trim();

  const newGroup = JSON.stringify({
    group_id: +groupInputValue,
  });

  try {
    const response = await fetch("http://localhost:5000/accounts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: newGroup,
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

export { addGroup };
