import { comments } from "./comments.js";
import { initClickLikeListeners, initClickCommentListeners, initAddCommentListener } from "./initListeners.js";
import { formateDate, formatText } from "./helpers.js";
import { renderLogin } from "./renderLogin.js";
import { token } from "./api.js"

// const commentsList = document.querySelector('ul.comments');
const app = document.getElementById("app");
// const loaderComments = document.querySelector('.loader-comments');
const loaderComment = document.querySelector('.loader-comment');
// const commentsList = document.querySelector('ul.comments');


export function renderComments() {
  console.log("\nЭто список комментариев в renderComments() перед отрисовкой:");
  console.log(comments);
  const commentsHtml = comments.map((comment, index) => {
    if (comment.isLiked) {
      return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div class="user-name wrap-words">${comment.name}</div>
          <div class="date">${formateDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text wrap-words">${formatText(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class="like-button -active-like"></button>
          </div>
        </div>
      </li>`
    } else if (!comment.isLiked) {
      return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div class="user-name wrap-words">${comment.name}</div>
          <div class="date">${formateDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text wrap-words">${formatText(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`
    }
  })
    .join("");

  const addCommentsFormHtml = `
    <div class="loader-comment">Комментарий добавляется, подождите, пожалуйста...</div>
    <div class="add-form">
      <input id="name" type="text" class="add-form-name item" placeholder="Введите ваше имя" />
      <textarea id="commentText" type="textarea" class="add-form-text item" placeholder="Введите ваш комментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>`


  const linkToLoginForm = `
    <div class="link-container">
      <div id="auth-link">Чтобы добавить комментарий, авторизуйтесь</div>
    </div>`


  // const baseHtml = `<ul class="comments">${commentsHtml}</ul>
  // ${addCommentsFormHtml}`

  // если есть токен, то рендерим комментарии, если токена нет, то ссылку
  const baseHtml = `<ul class="comments">${commentsHtml}</ul>
  ${token ? addCommentsFormHtml : linkToLoginForm}`

  app.innerHTML = baseHtml;

  // если есть токен, то обработчики на элементы комментария и кнопку добавления коммента, если токена нет, то обработчик на ссылку
  if (token) {
    initClickLikeListeners();
    initClickCommentListeners();
    initAddCommentListener();

  } else {
    const linkToLogin = document.getElementById("auth-link");

    linkToLogin.addEventListener("click", () => {
      renderLogin();
    })
  }


  // const commentsList = document.querySelector('ul.comments');
  // const loaderComments = document.querySelector('.loader-comments');

  // loaderComments.style.display = "none";
  // commentsList.style.display = "block";



}