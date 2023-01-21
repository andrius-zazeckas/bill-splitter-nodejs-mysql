const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullNameInputValue = document
    .querySelector("#full-name-input")
    .value.trim();
  const emailInputValue = document.querySelector("#email-input").value.trim();
  const pswInputValue = document.querySelector("#password-input").value.trim();

  const user = JSON.stringify({
    full_name: fullNameInputValue,
    email: emailInputValue,
    password: pswInputValue,
  });

  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    const response = await fetch("http://localhost:5000/v1/auth/register", {
      method: "POST",
      headers: myHeaders,
      body: user,
    });

    if (response.ok) {
      registerForm.reset();

      alert("Registered successfuly");

      return window.location.assign(`./login.html`);
    }

    if (!response.ok || response.status >= 400) {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
});
