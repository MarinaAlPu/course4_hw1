import { fetchAndRenderComments } from "./fetchAndRenderComments.js";

// прокрутить наверх к форме
app.scrollIntoView({
  behavior: 'smooth'
});

fetchAndRenderComments();
// localStorage.setItem("userLogin", "");
// localStorage.setItem("userName", "");
// localStorage.setItem("userToken", "");