import { registration } from "./api.js";

export const renderRegistration = () => {
  const app = document.getElementById("app");

  app.innerHTML = `
  <div id="reg-form" class="container">
    <div class="title">Страница регистрации</div>
    <div class="registration-form">
      <input id="login" type="text" class="registration-form-login item" placeholder="Логин" />
      <input id="name" type="text" class="registration-form-name item" placeholder="Имя" />
      <input id="password" type="text" class="registration-form-password item" placeholder="Пароль" />
      <button class="registration-form-button">Зарегистрироваться</button>
    </div>
  </div>
  `

  const regButton = document.querySelector(".registration-form-button");
  const loginInput = document.getElementById("login");
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");

  regButton.addEventListener("click", () => {
    registration({
      login: loginInput.value,
      name: nameInput.value,
      password: passwordInput.value
    })
      .then((responseData) => {
        console.log(responseData);
        // console.log(responseData.user.token);
      })

    loginInput.value = "";
    nameInput.value = "";
    passwordInput.value = "";
  })
}