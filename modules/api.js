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
      response.json()
    })
}


export { getComments, sendComment }