/* ------------------------------ TASK 3 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Informacija atvaizdavima <div id="output"></div> bloke
1.1. Informacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;

Pastaba: Sukurta kortelė, kurioje yra pateikiama vartotojo informacija, turi 
turėti bent minimalų stilių ir būti responsive;
-------------------------------------------------------------------------- */

const ENDPOINT = "https://api.github.com/users";

const getUsers = async () => {
  try {
    const response = await fetch(ENDPOINT);
    const users = await response.json();

    return users;
  } catch (error) {
    console.error(error);
  }
};

const createUserCard = (user) => {
  const userContainer = document.createElement("div");
  userContainer.setAttribute("class", "userContainer");

  const userImgElement = document.createElement("img");
  userImgElement.setAttribute("alt", "UserPicture");
  userImgElement.src = user.avatar_url;

  const userLoginNameElement = document.createElement("p");
  userLoginNameElement.setAttribute("class", "userLoginName");
  userLoginNameElement.innerText = user.login;

  userContainer.append(userImgElement, userLoginNameElement);

  document.querySelector("#output").append(userContainer);
};

const renderUserCard = async () => {
  document.querySelector("#output").replaceChildren();
  const users = await getUsers();

  users.forEach((user) => createUserCard(user));
};

document.querySelector("#btn").addEventListener("click", renderUserCard);
