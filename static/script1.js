let textarea = document.querySelector("#textarea-container");

let tabKeyPressed = false;
let showSuggestions = false;
let suggestedWord = "";
let hasPredictContainer = false;

document.addEventListener('keydown', (event) => {
    
    if (event.code === "Space") {
        
        console.log(textarea.textContent)
        let data = new FormData()
        data.append("text_area", textarea.textContent)
        fetch('/', {
            "method": "POST",
            "body": data,
        }).then(function (text){
            console.log(text)
        })
    }
}); 

function loadData(){
    fetch('/')
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        console.log(data)
        
        
    }) 
}


document.addEventListener("keydown", (event) => {
    tabKeyPressed = event.key === "Shift";  
    if (tabKeyPressed) {
      loadData();
      return;
    }
  });