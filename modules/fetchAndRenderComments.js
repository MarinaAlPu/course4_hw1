import { getComments } from "./api.js"
import { updateComments } from "./comments.js";
import { normalizeData } from "./helpers.js";
import { renderComments } from "./renderComments.js";


export const fetchAndRenderComments = () => {
  const app = document.getElementById("app");

  app.innerHTML = '<div class="loader-comments">Комментарии загружаются, подождите, пожалуйста...</div>';

  const loaderComments = document.querySelector('.loader-comments');

  loaderComments.style.display = "block";
  
  return getComments()
    .then((data) => {
      const normData = normalizeData(data);
      updateComments(normData);

      loaderComments.style.display = "none";

      renderComments();
    })
}