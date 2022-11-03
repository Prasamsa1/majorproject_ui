let textarea = document.querySelector("#textarea-container");

let tabKeyPressed = false;
let showSuggestions = false;
let suggestedWord = "";
let hasPredictContainer = false;

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        console.log(textarea.value)
        let data = new FormData()
        data.append("text_area", textarea.value)
        fetch('/', {
            "method": "POST",
            "body": data,
        }).then(function (text){
            console.log(text)
        })
    }
    textarea.focus();
});

// function loadData(){
//     fetch('/')
//     .then(function(response){
//         return response.text();
//     })
//     .then(function(data){
//         console.log(data)
//             div.innerHTML=data;
// })
// }

document.addEventListener("keydown", (event) => {
    tabKeyPressed = event.key === "Tab";
    if (tabKeyPressed) {
      textarea.focus();
      event.preventDefault();
      loadData();
      return;
    }
  });