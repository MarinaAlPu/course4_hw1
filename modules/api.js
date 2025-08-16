const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
  method: 'GET',
})
  .then((response) => {
    // console.log(response);
    // console.log("\nСтатус-код ответа: ", response.status);
    return response.json()
  })
}


export {getComments}