const newGroup = async () => {
  const groupInputValue = document
    .querySelector("#new-group-input")
    .value.trim();

  const newGroup = JSON.stringify({
    name: groupInputValue,
  });

  try {
    const response = await fetch("http://localhost:5000/groups", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: newGroup,
    });

    const groupData = await response.json();

    if (response.ok) {
      alert(groupData.message);

      return window.location.reload();
    }

    if (!response.ok || response.status >= 400) {
      return alert(groupData.error || groupData.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
};

export { newGroup };
