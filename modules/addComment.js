import { validation, formatText, formateDate, normalizeData, checkErrorMessage } from "./helpers.js"
import { getComments, sendComment } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";

const nameInput = document.getElementById('name');
const commentInput = document.getElementById('commentText');
const loaderComment = document.querySelector('.loader-comment');
const form = document.querySelector('.add-form')


export const addComment = () => {
  const nameInputStatus = validation(nameInput);
  const commentInputStatus = validation(commentInput);

  if (!nameInputStatus || !commentInputStatus) {
    return
  }

  const nameText = nameInput.value;
  const commentText = commentInput.value;

  const nameTextForComment = formatText(nameText);
  const commentTextForComment = formatText(commentText);

  const dateForComment = formateDate();

  const commentObject = {
    name: nameTextForComment,
    date: dateForComment,
    text: commentTextForComment,
    likesCounter: 0,
    like: false
  };

  sendComment(commentObject.text, commentObject.name)
    .then(() => {
      return getComments()
        .catch((error) => {
          if (checkErrorMessage) {
            alert(error.message);
          } else {
            alert("Неизвестная ошибка:", error);
          }
        });
    })
    .then((data) => {
      const normalizeСomments = normalizeData(data);
      updateComments(normalizeСomments);
      renderComments();
      nameInput.value = "";
      commentInput.value = "";
    })
    .catch((error) => {
      if (error.message === "Сервер сломался, попробуй позже") {
        addComment()
      } else if (checkErrorMessage(error)) {
        alert(error.message);
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    })
    .finally(() => {
      loaderComment.style.display = "none";
      form.style.display = "block";
    })
};
