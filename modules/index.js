import { fetchAndRenderComments } from "./fetchAndRenderComments.js";

// прокрутить наверх к форме
app.scrollIntoView({
  behavior: 'smooth'
});

fetchAndRenderComments();
