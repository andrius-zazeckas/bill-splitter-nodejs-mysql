const getUserGroups = async () => {
  try {
    const response = await fetch(`http://localhost:5000/accounts`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const userGroups = await response.json();

    if (!response.ok || response.status >= 400) {
      if (userGroups.error === "User unauthorised") {
        alert(userGroups.error);

        return window.location.assign(`./login.html`);
      }

      return alert(userGroups.error || userGroups.statusText);
    }

    return userGroups;
  } catch (error) {
    alert(error.message);
  }
};

export { getUserGroups };
