import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { delay } from "./helpers.js";
import { addComment } from "./addComment.js";
import { deleteClass, setPlaceholder, checkErrorMessage } from "./helpers.js"

const nameInput = document.getElementById('name');
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

// обработчик клика по полю "Имя"
export const initNameDeleteClass = () => {
  nameInput.addEventListener("click", () => {
    deleteClass(nameInput, "error");
  });
}

// обработчик клика по полю "Текст комментария"
export const initCommentTextDeleteClass = () => {
  commentInput.addEventListener("click", () => {
    deleteClass(commentInput, "error");
  });
}

// обработчик события потери фокуса на поле "Имя"
export const initSetNamePlaceholder = () => {
  nameInput.addEventListener("blur", () => {
    setPlaceholder(nameInput, "Введите ваше имя");
  });
}

// обработчик события потери фокуса на поле  "Текст комментария"
export const initSetCommentTextPlaceholder = () => {
  commentInput.addEventListener("blur", () => {
    setPlaceholder(commentInput, "Введите ваш коментарий");
  });
}

// функция навешивания обработчика на кнопку добавления комментария
export const initAddCommentListener = () => {
  const addCommentButton = document.querySelector('.add-form-button');
  const commentsList = document.querySelector('ul.comments');
  const loaderComments = document.querySelector('.loader-comments');
  const loaderComment = document.querySelector('.loader-comment');
  const form = document.querySelector('.add-form')


  loaderComments.style.display = "block";
  loaderComment.style.display = "none";
  commentsList.style.display = "none";

  addCommentButton.addEventListener("click", () => {
    loaderComment.style.display = "block";
    form.style.display = "none";
    addComment()
  });
}