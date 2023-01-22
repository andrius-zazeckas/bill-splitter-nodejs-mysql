import { addGroup } from "./addGroup.js";
import { getUserGroups } from "./getUserGroups.js";
import { renderGroupsNames } from "./renderGroupsNames.js";

const renderGroups = async () => {
  const groups = await getUserGroups();

  if (!groups) {
    return;
  }

  if (groups.error) {
    return;
  }

  await renderGroupsNames();

  const textContainer = document.querySelector("#text-container");
  textContainer.replaceChildren();
  textContainer.style = "margin: 40px";

  if (!groups.length) {
    const noDataEl = document.createElement("h2");
    noDataEl.textContent = "There is no groups assigned to you";

    return textContainer.append(noDataEl);
  }

  const headEl = document.createElement("h1");
  headEl.textContent = "Select Your Group";

  textContainer.append(headEl);

  const sectionContainer = document.querySelector("#groups");
  sectionContainer.replaceChildren();

  groups.forEach((group) => {
    const { group_id, name } = group;

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    contentContainer.addEventListener("click", () => {
      window.location.assign(`./bills.html?group_id=${group_id}`);
    });

    const idEl = document.createElement("h3");

    const nameEl = document.createElement("p");

    idEl.textContent = `ID: ${group_id}`;

    nameEl.textContent = name;

    contentContainer.append(idEl, nameEl);

    sectionContainer.append(contentContainer);
  });
};

await renderGroups();

document.body
  .querySelector("#add-group-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    await addGroup();
  });
