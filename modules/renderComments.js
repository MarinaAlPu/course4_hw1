import { comments } from "./comments.js";
import { initClickLikeListeners, initClickCommentListeners } from "./initListeners.js"

const commentsList = document.querySelector('ul.comments');


export function renderComments() {
  const commentsHtml = comments.map((comment) => {
    const dateOptions = { day: 'numeric', month: '2-digit', year: '2-digit' };
    const timeOptions = { hour: 'numeric', minute: 'numeric' };

    const date = (new Date()).toLocaleDateString('ru-RU', dateOptions);
    const time = (new Date()).toLocaleTimeString('ru-RU', timeOptions);

    const dateForComment = date + " " + time;

    // const date = new Date(comment.date,)

    if (comment.isLiked) {
      return `<li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div class="user-name wrap-words">${comment.author.name}</div>
          <div class="date">${dateForComment}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text wrap-words">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button -active-like"></button>
          </div>
        </div>
      </li>`
    } else if (!comment.isLiked) {
      return `<li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div class="user-name wrap-words">${comment.author.name}</div>
          <div class="date">${dateForComment}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text wrap-words">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`
    }
  })
    .join("");

  commentsList.innerHTML = commentsHtml;

  initClickLikeListeners();
  initClickCommentListeners();
}