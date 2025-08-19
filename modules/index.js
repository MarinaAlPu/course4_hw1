import { renderComments } from "./renderComments.js";
import { deleteClass, setPlaceholder } from "./helpers.js"
import { addComment } from "./addComment.js";
import { updateComments } from "./comments.js";
import { getComments } from "./api.js";
import { normalizeData, delay } from "./helpers.js";

const nameInput = document.getElementById('name');
const commentInput = document.getElementById('commentText');
const addCommentButton = document.querySelector('.add-form-button');
const commentsList = document.querySelector('ul.comments');
const loaderComments = document.querySelector('.loader-comments');
const loaderComment = document.querySelector('.loader-comment');
const form = document.querySelector('.add-form')


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

loaderComments.style.display = "block";
loaderComment.style.display = "none";
commentsList.style.display = "none";

addCommentButton.addEventListener("click", () => {
  loaderComment.style.display = "block";
  form.style.display = "none";
  addComment();
  delay(2000).then(() => {
    getComments()
      .then((data) => {
        const normalizeСomments = normalizeData(data);
        updateComments(normalizeСomments);
        loaderComment.style.display = "none";
        form.style.display = "block";
        renderComments();

      })
  });
});

getComments()
  .then((data) => {
    const normalizeСomments = normalizeData(data);
    updateComments(normalizeСomments);
    renderComments();
  })
