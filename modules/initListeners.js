import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { delay } from "./helpers.js";

const commentInput = document.getElementById('commentText');


export const initClickLikeListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  let isLikeLoading = false;
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      if (isLikeLoading) {
        return;
      }

      isLikeLoading = true;
      // получить целевой элемент
      const commentNumber = event.target.closest('li.comment');

      // получить индекс комментария
      const commentIndex = commentNumber.dataset.index;

      // получить комментарий по индексу из массива
      const currentComment = comments[commentIndex];

      // проверить статус лайка по индексу в объекте комментария в массиве
      const currentisLiked = currentComment.isLiked;

      likeButton.classList.add('-loading-like')
      delay(2000)
        .then(() => {
          if (isLikeLoading === true) {
            if (currentisLiked) {
              currentComment.isLiked = false;
              currentComment.likesCounter--;
            } else if (!currentisLiked) {
              currentComment.isLiked = true;
              currentComment.likesCounter++;
            }

            likeButton.classList.remove('-loading-like')

            renderComments();
          }
        })
        .then(() => {
          isLikeLoading = false;
        })
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