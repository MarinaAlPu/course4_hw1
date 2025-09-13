import { getComments } from "./api.js"
import { updateComments } from "./comments.js";
import { normalizeData } from "./helpers.js";
import { renderComments } from "./renderComments.js";


// export const fetchAndRenderComments = () => {
//   const loaderComments = document.querySelector('.loader-comments');

//   if (loaderComments) { loaderComments.style.display = "block"; }

//   return getComments()
//   .then((data) => {
//     const normData = normalizeData(data);
//     updateComments(normData);
//     if (loaderComments) { loaderComments.style.display = "none"; }
//       // loaderComments.style.display = "none";
//       renderComments();
//     })
// }


export const fetchAndRenderComments = () => {
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