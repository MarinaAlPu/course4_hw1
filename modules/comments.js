  export let comments = [
    // {
    //   name: "Глеб Фокин",
    //   date: "12.02.22 12:18",
    //   text: "Это будет первый комментарий на этой странице",
    //   likesCounter: 3,
    //   isLiked: false
    // },
    // {
    //   name: "Варвара Н.",
    //   date: "13.02.22 19:22",
    //   text: "Мне нравится как оформлена эта страница! ❤",
    //   likesCounter: 75,
    //   isLiked: true
    // },
  ];

comments = await fetch("https://wedev-api.sky.pro/api/v1/marina-pudovkina/comments", {
  method: 'GET',
})
  .then((response) => {
    // console.log(response);
    // console.log("\nСтатус-код ответа: ", response.status);
    return response.json()
  })
  .then((data) => {
    // console.log(data.comments);
    return data.comments;
  })

console.log("\nСписок комментариев с сервера в файле comments.js:");
console.log(comments);