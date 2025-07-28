import { comments } from "./comments.js";
import {initClickLikeListeners, initClickCommentListeners} from "./initListeners.js"

const commentsList = document.querySelector('ul.comments');


export function renderComments() {
  const commentsHtml = comments.map((comment, index) => {
    if (comment.isLiked) {
      return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div class="user-name wrap-words">${comment.name}</div>
          <div class="date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text wrap-words">${comment.text}</div>
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
          <div class="date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text wrap-words">${comment.text}</div>
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

  commentsList.innerHTML = commentsHtml;

  initClickLikeListeners();
  initClickCommentListeners();
}