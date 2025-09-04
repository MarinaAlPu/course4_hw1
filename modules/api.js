const baseUrl = "https://wedev-api.sky.pro/api/v2/marina-pudovkina";
const authUrl = "https://wedev-api.sky.pro/api/user";

let token = "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

export const updateToken = (newToken) => {
  token = newToken;
}


const getComments = () => {
  return fetch(`${baseUrl}/comments`, {
    method: 'GET',
  })
    .then((response) => {
      // console.log(response);
      // console.log(response.status);

      if (response.status === 200) {
        return response.json();
        // } else if (response.status === 401) {
        //   throw new Error("Вы не авторизовались");
        // } else if (response.status === 404) {
        //   throw new Error("Страница не найдена");
        // } else if (response.status === 500) {
        //   throw new Error("Сервер сломался, попробуй позже");
        // } else {
        //   throw new Error(`Неопознанная ошибка. Статус код ${response.status}`);
        // }
      } else {
        // if (response.status === 401) {
        //   throw new Error("Вы не авторизовались");
        // }

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

const sendComment = (text, name) => {
  return fetch(`${baseUrl}/comments`, {
    method: 'POST',
    body: JSON.stringify({ "text": text, "name": name, forceError: true })
  })
    .then((response) => {
      // console.log(response);
      // console.log("\nКод ответа: ", response.status);

      if (response.status === 201) {
        response.json();
      } else {
        if (response.status === 401) {
          throw new Error("Вы не авторизовались");
        }

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

const login = (login, password) => {
  return fetch(`${authUrl}/login`, {
    method: POST,
    body: JSON.stringify({
      login,
      password
    })
  })
    .then((response) => {
      return response.json()
    })
}

const registration = (login, name, password) => {
  return fetch(authUrl, {
    method: POST,
    body: JSON.stringify({
      login,
      name,
      password
    })
  })
    .then((response) => {
      return response.json()
    })
}

const getUsers = () => {
  return fetch(authUrl, {
    method: GET
  })
    .then((response) => {
      return response.json()
    })
}


export { getComments, sendComment, login, registration, getUsers }