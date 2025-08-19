function validation(element) {
  if ((element.value).trim() === "") {
    element.classList.add("error");
    element.value = "";
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

function formatText(text) {
  return text.replaceAll("<", "&lt").replaceAll(">", "&gt");
}

function formateDate(dateFromServer = new Date()) {
  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric' };

  const date = (new Date(dateFromServer)).toLocaleDateString('ru-RU', dateOptions);
  const time = (new Date(dateFromServer)).toLocaleTimeString('ru-RU', timeOptions);

  const dateForComment = date + " " + time;

  return dateForComment;
}

function normalizeData(dataFromServer) {
  return (dataFromServer.comments).map((comment) => {
    return {
      name: comment.author.name,
      date: formateDate(comment.date),
      text: comment.text,
      likesCounter: comment.likes,
      isLiked: comment.isLiked,
    }
  })
}

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}


export { validation, deleteClass, setPlaceholder, formatText, formateDate, normalizeData, delay }