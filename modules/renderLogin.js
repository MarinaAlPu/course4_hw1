import { login, updateToken, getName, name } from "./api.js";
import { renderRegistration } from "./renderRegistration.js";
import { fetchAndRenderComments } from "./fetchAndRenderComments.js";


export const renderLogin = () => {
  const app = document.getElementById("app");

  app.innerHTML = `
  <div id="log-form" class="container">
    <div class="title">Страница входа</div>
    <div class="login-form">
      <input id="login" type="text" class="login-form-login item" placeholder="Логин" />
      <input id="password" type="password" class="login-form-password item" placeholder="Пароль" />
      <div class="login-form-button-container">
        <button class="login-form-login-button">Войти</button>
        <button class="login-form-registration-button">Зарегистрироваться</button>
      </div>
    </div>
  </div>
  `

  const loginButton = document.querySelector(".login-form-login-button");
  const passwordInput = document.getElementById("password");
  const loginInput = document.getElementById("login");


  loginButton.addEventListener("click", () => {
    login(loginInput.value, passwordInput.value)
      .then((responseData) => {
        // console.log("\nЭто responseData:");
        // console.log(responseData);

        if (responseData === "Неверный логин или пароль") {
          alert(responseData)
        } else {
        updateToken(responseData.user.token);
        getName(responseData.user.name);

        localStorage.setItem("userLogin", responseData.user.login);
        localStorage.setItem("userName", responseData.user.name);
        localStorage.setItem("userToken", responseData.user.token);

        fetchAndRenderComments();
        }
      })
      .catch((error) => {
        console.log("\nЭто error:");
        console.log(error);
        alert("Неверный логин или пароль")
      })
      .finally(() => {
        loginInput.value = "";
        passwordInput.value = "";
      })
  })


  const regButton = document.querySelector(".login-form-registration-button");

  regButton.addEventListener("click", () => {
    renderRegistration();
  })
}