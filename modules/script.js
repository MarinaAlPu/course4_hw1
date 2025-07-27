  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('commentText');
  const addCommentButton = document.querySelector('.add-form-button');
  const commentsList = document.querySelector('ul.comments');

  const comments = [
    {
      name: "Глеб Фокин",
      date: "12.02.22 12:18",
      text: "Это будет первый комментарий на этой странице",
      likesCounter: 3,
      isLiked: false
    },
    {
      name: "Варвара Н.",
      date: "13.02.22 19:22",
      text: "Мне нравится как оформлена эта страница! ❤",
      likesCounter: 75,
      isLiked: true
    },
  ];

  const commentTemplate =
    `<li class="comment">
        <div class="comment-header">
          <div class="user-name"></div>
          <div class="date"></div>
        </div>
        <div class="comment-body">
          <div class="comment-text"></div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter"></span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`

  // функция навешивания обработчика события на лайк
  const initClickLikeListeners = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", () => {
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

  function validation(element) {
    if (element.value === "") {
      element.classList.add("error");
      // element.placeholder = "Чтобы отправить комментарий заполните это поле";
      element.placeholder = "Заполните это поле";
      return false;
    } else {
      return true;
    }
  }

  function deleteClass(element, className) {
    element.classList.remove(className);
    element.placeholder = "";
  }

  function setPlaceholder(element, placeholderText) {
    element.placeholder = placeholderText;
  }

  function renderComments() {
    const commentsHtml = comments.map((comment, index) => {
      if (comment.isLiked) {
        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div class="user-name">${comment.name}</div>
          <div class="date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
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
          <div class="user-name">${comment.name}</div>
          <div class="date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
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
  }

  renderComments();

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
    let status = true;

    status = validation(nameInput);
    status = validation(commentInput);


    if (status === true) {
      const dateOptions = { day: 'numeric', month: '2-digit', year: '2-digit' };
      const timeOptions = { hour: 'numeric', minute: 'numeric' };

      const date = (new Date()).toLocaleDateString('ru-RU', dateOptions);
      const time = (new Date()).toLocaleTimeString('ru-RU', timeOptions);

      const dateForComment = date + " " + time;

      const commentObject = {
        name: nameInput.value,
        date: dateForComment,
        text: commentInput.value,
        likesCounter: 0,
        like: false
      };

      nameInput.value = "";
      commentInput.value = "";


      comments.push(commentObject);
      // console.log(comments);
      renderComments();
    }
  });