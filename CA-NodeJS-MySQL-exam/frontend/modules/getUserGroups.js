const getUserGroups = async () => {
  try {
    const response = await fetch(`http://localhost:5000/accounts`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const content = await response.json();

    if (!response.ok || response.status >= 400) {
      return alert(content.error || content.statusText);
    }

    return content;
  } catch (error) {
    alert(error.message);
  }
};

export { getUserGroups };
