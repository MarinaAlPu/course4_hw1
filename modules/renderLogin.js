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

  // let userName = "";

  loginButton.addEventListener("click", () => {
    login(loginInput.value, passwordInput.value)
      .then((responseData) => {
        console.log("\nЭто responseData:");
        console.log(responseData);

        if (responseData === "Неверный логин или пароль") {
          alert(responseData)
        } else {
        // console.log(responseData.user.token);
        // console.log(responseData.user.name);
        updateToken(responseData.user.token);
        getName(responseData.user.name);
        localStorage.setItem("userLogin", responseData.user.login);
        localStorage.setItem("userName", responseData.user.name);
        localStorage.setItem("userToken", responseData.user.token);
        // console.log("\Это userName в функции login", responseData.user.name);
        fetchAndRenderComments();

        // loginInput.value = "";
        // passwordInput.value = "";

        // const nameInput = document.getElementById("name");

        // if (nameInput) {
        //   nameInput.value = userName; // Устанавливаем имя
        // } else {
        //   console.error("Элемент с id 'name' не найден.");
        // }
        // return userName;
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
    // .catch((error) => {
    //   console.log("\nЭто error:");
    //   console.log(error.message);
    //       // if (error.message === "Неверный логин или пароль") {
    //       //   addComment()
    //       // } 
    //       // else if (checkErrorMessage(error)) {

    // })



    // .catch((error) => {
    //   if (error.message === "Сервер сломался, попробуй позже") {
    //     addComment()
    //   } else if (checkErrorMessage(error)) {
    //     alert(error.message);
    //   } else {
    //     alert("Кажется, у вас сломался интернет, попробуйте позже");
    //   }
    // })
    // .finally(() => {
    //   loaderComment.style.display = "none";
    //   form.style.display = "block";
    // })



    // const nameInput = document.getElementById("name");
    // // nameInput.value = "Моё Имя";
    // console.log(nameInput);
    // console.log(nameInput.value);

    // nameInput.value = userName;
    // console.log(nameInput.value);

    // const nameInput = document.getElementById("name");
    // nameInput.value = userName;
  })


  const regButton = document.querySelector(".login-form-registration-button");

  regButton.addEventListener("click", () => {
    renderRegistration();
  })


}