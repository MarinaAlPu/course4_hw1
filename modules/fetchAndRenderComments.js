import { getComments } from "./api.js"
import { updateComments } from "./comments.js";
import { normalizeData } from "./helpers.js";
import { renderComments } from "./renderComments.js";
import { initAddCommentListener } from "./initListeners.js";


export const fetchAndRenderComments = () => {
  return getComments()
    .then((data) => {
      // console.log(data);
      const normData = normalizeData(data);
      console.log("\nЭто normData в fetchAndRenderComments:");
      console.log(normData);
      updateComments(normData);
      renderComments();
      // initAddCommentListener();
    })
}