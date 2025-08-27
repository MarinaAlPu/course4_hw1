const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("Страница не найдена");
      } else if (response.status === 500) {
        throw new Error("Сервер сломался, попробуй позже");
      } else {
        throw new Error(`Неопознанная ошибка. Статус код ${response.status}`);
      }
    })
}

const sendComment = (text, name) => {
  return fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
    method: 'POST',
    body: JSON.stringify({ "text": text, "name": name, forceError: true })
  })
    .then((response) => {
      if (response.status === 201) {
        response.json();
      } else {
        if (response.status === 400) {
          throw new Error("Имя и комментарий должны быть не короче 3 символов");
        }

        if (response.status === 404) {
          throw new Error("Страница не найдена");
        }

        if (response.status === 500) {
          throw new Error("Сервер сломался, попробуй позже");
        }

        throw new Error(`Неопознанная ошибка. Статус код ${response.status}`);
      }
    })
}


export { getComments, sendComment }