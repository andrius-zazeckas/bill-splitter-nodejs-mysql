const getGroups = async () => {
  try {
    const response = await fetch(`http://localhost:5000/groups`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const groups = await response.json();

    if (!response.ok || response.status >= 400) {
      if (groups.error === "User unauthorised") {
        alert(groups.error);

        return window.location.assign(`./login.html`);
      }

      return alert(groups.error || groups.statusText);
    }

    return groups;
  } catch (error) {
    alert(error.message);
  }
};

export { getGroups };
