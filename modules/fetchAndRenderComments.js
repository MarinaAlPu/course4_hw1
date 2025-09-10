import { getComments } from "./api.js"
import { updateComments } from "./comments.js";
import { normalizeData } from "./helpers.js";
import { renderComments } from "./renderComments.js";


export const fetchAndRenderComments = () => {
  return getComments()
    .then((data) => {
      const normData = normalizeData(data);
      updateComments(normData);
      renderComments();
    })
}