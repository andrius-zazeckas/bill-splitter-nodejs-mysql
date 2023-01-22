const getGroups = async () => {
  try {
    const response = await fetch(`http://localhost:5000/groups`);
    const groups = await response.json();

    if (!response.ok || response.status >= 400) {
      return alert(groups.error || groups.statusText);
    }

    return groups;
  } catch (error) {
    alert(error.message);
  }
};

export { getGroups };
