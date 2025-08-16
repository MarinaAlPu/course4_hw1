import { renderComments } from "./renderComments.js";
import { deleteClass, setPlaceholder } from "./helpers.js"
import { addComment } from "./addComment.js";
import { updateComments } from "./comments.js";
import { getComments } from "./api.js";
import { normalizeData } from "./helpers.js";

const nameInput = document.getElementById('name');
const commentInput = document.getElementById('commentText');
const addCommentButton = document.querySelector('.add-form-button');


nameInput.addEventListener("click", () => {
  deleteClass(nameInput, "error");
});

commentInput.addEventListener("click", () => {
  deleteClass(commentInput, "error");
});

nameInput.addEventListener("blur", () => {
  setPlaceholder(nameInput, "Введите ваше имя");
});

commentInput.addEventListener("blur", () => {
  setPlaceholder(commentInput, "Введите ваш коментарий");
});

addCommentButton.addEventListener("click", () => {
  addComment();
  getComments()
    .then((data) => {
      const normalizeСomments = normalizeData(data);
      updateComments(normalizeСomments);
      renderComments();
    })
    
});

getComments()
  .then((data) => {
    const normalizeСomments = normalizeData(data);
    updateComments(normalizeСomments);
    renderComments();
  })
