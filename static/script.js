let textarea = document.getElementById("textarea-container");

let tabKeyPressed = false;
let showSuggestions = false;
let suggestedWord = "";
let hasPredictContainer = false;

function setCursor() {
  const selection = window.getSelection(); //Create selection
  const range = document.createRange(); //To create range of text

  selection.removeAllRanges(); //Remove any existing range of cursor
  range.selectNodeContents(textarea); //To apply new range  on

  selection.addRange(range); //Set new range for cursor
  range.collapse(false); //Remove whole text selection
  textarea.focus();
}

//To add suggestions to user text
function addSuggestions(event, suggestedWord) {
  let textContents = event.target.childNodes[0].textContent;
  event.target.childNodes[0].textContent = `${textContents.trim()} ${suggestedWord}`;
  textarea.focus();
}

//To show suggestions Word after user text
function showSuggestionWord(suggestedWord) {
  temp_element = `<span id="predict" class="predict" contenteditable="false">
          <span class="predict-word">${suggestedWord}</span>
          <span class="predict-word tab">TAB</span>
        </span>`;
  textarea.insertAdjacentHTML("beforeend", temp_element);
  hasPredictContainer = true;
}

//To reset the suggestions
const resetSuggestions = function () {
  suggestedWord = "";
  showSuggestions = false;
  hasPredictContainer = false;
};

document.addEventListener("keydown", (event) => {
  tabKeyPressed = event.key === "Tab";
  if (tabKeyPressed) {
    textarea.focus();
    event.preventDefault();
    return;
  }
});

document.addEventListener("keyup", predict);

function predict(event) {
  const text = event.target.textContent
    ? event.target.childNodes[0].textContent
    : "";

  let predictContainer = document.getElementById("predict");
  hasPredictContainer = Boolean(predictContainer);

  if (event.code === "Space") {
    let data = new FormData()
    data.append("text_area", text)
    const word = fetch('/', {
      "method": "POST",
      "body": data,
    }).then((response) => {
      return response.text()
    })
    // if (showSuggestions && !hasPredictContainer) {
    //   //Implement ML model here

    getSuggestedWord = () => {
      word.then((suggestedWord) => {
        showSuggestionWord(suggestedWord);
        showSuggestions = true


        if (tabKeyPressed && hasPredictContainer) {
          setCursor();
          predictContainer.remove();
          addSuggestions(event, suggestedWord);
          resetSuggestions();
        }
      })
        if (showSuggestions && hasPredictContainer) {
          predictContainer.remove();
          resetSuggestions();
        }
      
    };
    getSuggestedWord()

  }
  // }

  if (!showSuggestions && hasPredictContainer) {
    predictContainer.remove();
    resetSuggestions();
  }

  if (tabKeyPressed && hasPredictContainer) {
    setCursor();
    predictContainer.remove();
    addSuggestions(event, suggestedWord);
    resetSuggestions();
  }
}
(function ($) {

  $(document).on('change keydown keypress input', 'div[data-placeholder]', function () {

    if (this.textContent) {

      this.dataset.divPlaceholderContent = 'true';

    }

    else {

      delete (this.dataset.divPlaceholderContent);

    }

  });

})(jQuery);