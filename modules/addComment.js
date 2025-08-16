import { validation, formatText, formateDate } from "./helpers.js"
import { sendComment } from "./api.js";


const nameInput = document.getElementById('name');
const commentInput = document.getElementById('commentText');


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

  nameInput.value = "";
  commentInput.value = "";

  sendComment(commentObject.text, commentObject.name);
};