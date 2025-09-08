import { login, updateToken, getName } from "./api.js";
import { renderRegistration } from "./renderRegistration.js";
import { fetchAndRenderComments } from "./fetchAndRenderComments.js";

export const renderLogin = () => {
  const app = document.getElementById("app");

  app.innerHTML = `
  <div id="log-form" class="container">
    <div class="title">Страница входа</div>
    <div class="login-form">
      <input id="login" type="text" class="login-form-login item" placeholder="Логин" />
      <input id="password" type="text" class="login-form-password item" placeholder="Пароль" />
      <div class="login-form-button-container">
        <button class="login-form-login-button">Войти</button>
        <button class="login-form-registration-button">Зарегистрироваться</button>
      </div>
    </div>
  </div>
  `

  const loginButton = document.querySelector(".login-form-login-button");
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const regButton = document.querySelector(".login-form-registration-button");

  loginButton.addEventListener("click", () => {
    login(loginInput.value, passwordInput.value)
      .then((responseData) => {
        // console.log(responseData);
        // console.log(responseData.user.token);
        // console.log(responseData.user.name);
        updateToken(responseData.user.token);
        getName(responseData.user.name);
        fetchAndRenderComments();
      })

    loginInput.value = "";
    passwordInput.value = "";
  })

  regButton.addEventListener("click", () => {
    renderRegistration();
  })

  
}