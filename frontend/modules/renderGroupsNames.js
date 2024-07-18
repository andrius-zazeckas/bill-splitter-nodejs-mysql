import { getGroups } from "./getGroups.js";

const renderGroupsNames = async () => {
  const groups = await getGroups();

  if (!groups) {
    return;
  }

  if (groups.error) {
    return;
  }

  const select = document.querySelector("#group-input");
  select.replaceChildren();

  groups.forEach((group) => {
    const { id, name } = group;

    const optionEl = document.createElement("option");
    optionEl.value = id;
    optionEl.textContent = `ID: ${id} - ${name}`;

    select.append(optionEl);
  });
};

export { renderGroupsNames };
