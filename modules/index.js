import { renderComments } from "./renderComments.js";
import { deleteClass, setPlaceholder } from "./helpers.js"
import { addComment } from "./addComment.js";
import { comments, updateComments } from "./comments.js";
import { getComments } from "./api.js";
import { formateDate, normalizeData } from "./helpers.js";

const nameInput = document.getElementById('name');
const commentInput = document.getElementById('commentText');
const addCommentButton = document.querySelector('.add-form-button');


nameInput.addEventListener("click", () => {
  deleteClass(nameInput, "error");
});

commentInput.addEventListener("click", () => {
  deleteClass(commentInput, "error");
});

nameInput.addEventListener("blur", () => {
  setPlaceholder(nameInput, "Введите ваше имя");
});

commentInput.addEventListener("blur", () => {
  setPlaceholder(commentInput, "Введите ваш коментарий");
});

addCommentButton.addEventListener("click", () => {
  addComment();
  getComments()
    .then((data) => {
      const normalizeСomments = normalizeData(data);
      updateComments(normalizeСomments);
      renderComments();
    })

  // renderComments();
});

// fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
//   method: 'GET',
// })
//   .then((response) => {
//     // console.log(response);
//     // console.log("\nСтатус-код ответа: ", response.status);
//     return response.json()
//   })
getComments()
  .then((data) => {
    // console.log("\nСписок комментариев с сервера:");
    // console.log(data.comments);


    // нормализация данных, полученных от сервера
    // const commentsToRender = (data.comments).map((comment) => {
    //   return {
    //     name: comment.author.name,
    //     date: formateDate(comment.date),
    //     //   text: "Мне нравится как оформлена эта страница! ❤",
    //     //   likesCounter: 75,
    //     //   isLiked: true
    //     text: comment.text,
    //     likesCounter: comment.likes,
    //     isLiked: comment.isLiked,
    //   };
    // });
    const normalizeСomments = normalizeData(data);
    // console.log("\nНормализованные данные для обновления");
    // console.log(normalizeСomments);

    // console.log("\nСписок комментов до обновления");
    // console.log(comments);
    updateComments(normalizeСomments);
    // console.log("\nСписок комментов после обновления");
    // console.log(comments);

    renderComments();
  })

// renderComments();