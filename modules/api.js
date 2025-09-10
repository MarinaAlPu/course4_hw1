const baseUrl = "https://wedev-api.sky.pro/api/v2/marina-pudovkina";
const authUrl = "https://wedev-api.sky.pro/api/user";

export let token = "";

export const updateToken = (newToken) => {
  token = newToken;
}

export let name = "";

export const getName = (newName) => {
  name = newName;
}


const getComments = () => {
  return fetch(`${baseUrl}/comments`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify({ "text": text, "name": name, forceError: true })
  })
    .then((response) => {
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
    method: "POST",
    body: JSON.stringify({
      login,
      password
    })
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error("Неверный логин или пароль");
      }
    })
}

const registration = (login, name, password) => {
  return fetch(authUrl, {
    method: "POST",
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
    method: "GET"
  })
    .then((response) => {
      return response.json()
    })
}


export { getComments, sendComment, login, registration, getUsers }