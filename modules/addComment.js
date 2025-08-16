import { comments } from "./comments.js";
import { validation, formatText, formateDate } from "./helpers.js"


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

  // const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  // const timeOptions = { hour: 'numeric', minute: 'numeric' };

  // const date = (new Date()).toLocaleDateString('ru-RU', dateOptions);
  // const time = (new Date()).toLocaleTimeString('ru-RU', timeOptions);

  // const dateForComment = date + " " + time;
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


  fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
    method: 'POST',
    body: JSON.stringify({ "text": commentObject.text, "name": commentObject.name })
  })
    .then((response) => {
      response.json()
    })

  // comments.push(commentObject);
};