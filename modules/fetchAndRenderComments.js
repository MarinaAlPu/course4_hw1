import { getComments } from "./api.js"
import { updateComments } from "./comments.js";
import { normalizeData } from "./helpers.js";
import { renderComments } from "./renderComments.js";


export const fetchAndRenderComments = () => {
  const loaderComments = document.querySelector('.loader-comments');
  console.log("\nЭто loaderComments:");
  console.log(loaderComments);
  loaderComments.style.display = "block";

  return getComments()
    .then((data) => {
      const normData = normalizeData(data);
      updateComments(normData);
      loaderComments.style.display = "none";
      renderComments();
    })
}