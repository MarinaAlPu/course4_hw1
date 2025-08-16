import { renderComments } from "./renderComments.js";
import { deleteClass, setPlaceholder } from "./helpers.js"
import { addComment } from "./addComment.js";

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
  renderComments();
});

renderComments();

