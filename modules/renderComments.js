import { comments } from "./comments.js";
import { initClickLikeListeners, initClickCommentListeners, initAddCommentListener } from "./initListeners.js";
import { formatText } from "./helpers.js";
import { renderLogin } from "./renderLogin.js";

// const loaderComment = document.querySelector('.loader-comment');


export function renderComments() {
  const userName = localStorage.getItem("userName");

  // const commentsList = document.querySelector('ul.comments');
  // const loaderComments = document.querySelector('.loader-comments');

  const app = document.getElementById("app");


  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div class="user-name wrap-words">${comment.name}</div>
          <div class="date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text wrap-words">${formatText(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class='like-button ${comment.isLiked ? "-active-like" : ""}' data-index="${index}"></button>
          </div>
        </div>
      </li>`
  })
    .join("");

  const addCommentsFormHtml = `
    <div class="loader-comment">Комментарий добавляется, подождите, пожалуйста...</div>
    <div class="add-form">
      <input id="name" type="text" value="${userName}" readonly class="add-form-name item" placeholder="Введите ваше имя" />
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


  const userToken = localStorage.getItem("userToken");
  
  
  // если есть токен, то рендерим комментарии, если токена нет, то ссылку
  const baseHtml = `
    <div class="loader-comments">Комментарии загружаются, подождите, пожалуйста...</div>
    <ul class="comments">${commentsHtml}</ul>${userToken ? addCommentsFormHtml : linkToLoginForm}
    `


  app.innerHTML = baseHtml;

  // const loaderComments = document.querySelector('.loader-comments');
  // const commentsList = document.querySelector('ul.comments');

  // loaderComments.style.display = "block";
  // commentsList.style.display = "none";

  // если есть токен, то обработчики на элементы комментария и кнопку добавления коммента, если токена нет, то обработчик на ссылку
  if (userToken) {
    initClickLikeListeners();
    initClickCommentListeners();
    initAddCommentListener();

    // const loaderComments = document.querySelector('.loader-comments');
    // const commentsList = document.querySelector('ul.comments');

    // loaderComments.style.display = "block";
    // commentsList.style.display = "none";

    // loaderComments.style.display = "none";
    // commentsList.style.display = "block";
    
  } else {
    const linkToLogin = document.getElementById("auth-link");

    linkToLogin.addEventListener("click", () => {
      renderLogin();

      // прокрутить наверх к форме
      app.scrollIntoView({
        behavior: 'smooth'
      });
    })
  }


  // const commentsList = document.querySelector('ul.comments');
  // const loaderComments = document.querySelector('.loader-comments');

  // loaderComments.style.display = "none";
  // commentsList.style.display = "block";
}