

const selectTag = document.querySelectorAll("select");
const translateButton = document.querySelector("button");
let fromText = document.querySelector(".from_text");
let toText = document.querySelector(".to_text");
let exchange = document.querySelector(".exchange");
let icons = document.querySelectorAll("li i");

console.log(icons);

icons.forEach(icon => {
  icon.addEventListener("click", ({target}) => {
    if (target.classList.contains("fa-clipboard")) {
      if (target.id === "from") {
        navigator.clipboard.writeText(fromText.value);
      }
      else {
        navigator.clipboard.writeText(toText.value);
      }
    }

    else {
      let voice;
      if (target.id === "from") {
        voice = new SpeechSynthesisUtterance(fromText.value);
        voice.lang = selectTag[0].value;
      }
      else {
        voice = new SpeechSynthesisUtterance(toText.value);
        voice.lang = selectTag[1].value;
      }
      speechSynthesis.speak(voice);
    }
  })
})


selectTag.forEach((value, index) => {
  for (const countries_code in langCodes) {

    let selected;
    if (index == 0 && countries_code == "en") {
      selected = 'selected';
    }
    else if (index == 1 && countries_code == 'bn') {
      selected = 'selected';
    }

    // insert option to selected tag 
    let option = `
          <option value="${countries_code}" ${selected}>${langCodes[countries_code]}</option>`
          value.insertAdjacentHTML("beforeend", option);

          // console.log(countries_code);
  }
})

exchange.addEventListener("click", () => {
  // exchange textarea value 
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;

  // exhcange select tag value 

  let tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
})

// translate func 
const translateText = (url) => {
  fetch(url).then(res => res.json()).then(data => {
    toText.setAttribute("placeholder", "translation")
    toText.textContent = data.responseData.translatedText;
    console.log(data);
  })
}

// translate button 
translateButton.addEventListener("click", () => {
  let text = fromText.value;

  if (!text) {
    return;
  }

  toText.setAttribute("placeholder", "translating....")

  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}` 
  translateText(apiUrl); // calling api function
})