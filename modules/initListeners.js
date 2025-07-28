import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";


const commentInput = document.getElementById('commentText');


export const initClickLikeListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      // получить целевой элемент
      const commentNumber = event.target.closest('li.comment');

      // получить индекс комментария
      const commentIndex = commentNumber.dataset.index;

      // получить комментарий по индексу из массива
      const currentComment = comments[commentIndex];

      // проверить статус лайка по индексу в объекте комментария в массиве
      const currentisLiked = comments[commentIndex].isLiked;

      if (currentisLiked) {
        comments[commentIndex].isLiked = false;
        comments[commentIndex].likesCounter--;
      } else if (!currentisLiked) {
        comments[commentIndex].isLiked = true;
        comments[commentIndex].likesCounter++;
      }

      renderComments();
    })
  }
};

// функция навешивания обработчика события на клик по комментарию
export const initClickCommentListeners = () => {
  const existingComments = document.querySelectorAll('li.comment');

  for (const existingComment of existingComments) {
    existingComment.addEventListener("click", (event) => {
      // получить целевой элемент
      const existingComment = event.target.closest('li.comment');

      // получить индекс комментария
      const commentIndex = existingComment.dataset.index;

      // получить комментарий по индексу из массива
      const currentComment = comments[commentIndex];

      // получить данные для инпута
      const currentCommentName = currentComment.name;
      const currentCommentText = currentComment.text;

      // разместить данные в поле коммента
      const textForInput = ">>>" + currentCommentName + ": " + currentCommentText + "\n\n";
      commentInput.value = textForInput;

      renderComments();
    })
  }
};