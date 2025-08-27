const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
    method: 'GET',
  })
    .then((response) => {
      return response.json()
    })
}

const sendComment = (text, name) => {
  return fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
    method: 'POST',
    body: JSON.stringify({ "text": text, "name": name })
  })
    .then((response) => {
      // console.log("\nСтатус ответа на post-запрос: ");
      // console.log(response.status);
      if (response.status === 400) {
        alert("Имя и комментарий должны быть не короче 3 символов")
      }

      response.json()
    })
}


export { getComments, sendComment }