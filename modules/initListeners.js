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
      const commentId = Number(commentNumber.dataset.id);
      console.log("\nId комментария: ", commentId);
      console.log(typeof(commentId));

      console.log("\nСписок комментариев:");
      console.log(comments);
      // получить комментарий по индексу из массива
      // const currentComment = comments[commentId];
      console.log("\nId комментария из комментария по индексу:");
      console.log(comments[0].id);
      
      const currentComment = comments.find(comment => comment.id === commentId);
      console.log("\nТекущий комментарий:");
      console.log(currentComment);

      // проверить статус лайка по индексу в объекте комментария в массиве
      // const currentisLiked = comments[commentId].isLiked;
      const currentisLiked = currentComment.isLiked;

      if (currentisLiked) {
        // comments[commentId].isLiked = false;
        // comments[commentId].likesCounter--;
        currentComment.isLiked = false;
        currentComment.likes--;
      } else if (!currentisLiked) {
        // comments[commentId].isLiked = true;
        // comments[commentId].likesCounter++;
        currentComment.isLiked = true;
        currentComment.likes++;
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
      const commentId = Number(existingComment.dataset.id);

      // получить комментарий по индексу из массива
      // const currentComment = comments[commentIndex];
      const currentComment = comments.find(comment => comment.id === commentId);
      console.log("\nТекущий комментарий:");
      console.log(currentComment);

      // получить данные для инпута
      const currentCommentName = currentComment.author.name;
      const currentCommentText = currentComment.text;

      // разместить данные в поле коммента
      const textForInput = ">>>" + currentCommentName + ": " + currentCommentText + "\n\n";
      commentInput.value = textForInput;

      renderComments();
    })
  }
};