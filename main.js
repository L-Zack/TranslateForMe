import {countries} from "./countries.js";

const textareaInput = document.getElementById("text");
const select = document.querySelectorAll(".langSelector");
const flecha = document.getElementById("arrow");

textareaInput.addEventListener("change", alteraBotao);
textareaInput.addEventListener("click", alteraBotao);
textareaInput.addEventListener("focus", alteraBotao);
textareaInput.addEventListener("keyup", alteraBotao);
textareaInput.addEventListener("mouseover", alteraBotao);

select.forEach(selectButton => {
let tempLang = [];
    for(let language in countries) {
        tempLang.push(language); 
    }

    tempLang.forEach(language => {
        let option = document.createElement("option");
        option.setAttribute("value", language);
        let conteudo = `${countries[language]}`;

        selectButton.appendChild(option);
        option.innerHTML = conteudo;
    })
})

function alteraBotao() {
    let trimmed = textareaInput.value.trim();
    if(trimmed != '') {
        flecha.classList.add("arrowActived");
   } else {
   flecha.classList.remove("arrowActived");
   }
}

flecha.addEventListener("click", function() {
    const langInicial = document.getElementById("initialLang").value;
    const langDestino = document.getElementById("finalLang").value;
    const text = document.getElementById("text").value;
    const div = document.querySelector("#translation");

    fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${langInicial}|${langDestino}`)
    .then(response => response.json()) 
    
    .then(data => {
        let conteudo = data.responseData.translatedText;
        let translation = document.createElement("textarea");
        translation.setAttribute("value", "");
        translation.setAttribute("disabled", "");
        div.appendChild(translation);
        translation.innerHTML = conteudo;
    })
    .catch(function(error) {
        console.log(error);
    })
})

