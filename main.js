import {countries} from "./countries.js";

const textareaInput = document.getElementById("text");
const flechaDupla = document.querySelector(".doubleArrow");
const select = document.querySelectorAll(".langSelector");
const flecha = document.getElementById("arrow");
var translationBox = false;

var savedInitialLang = JSON.parse(localStorage.getItem("savedInitialLang")) || {};
var savedFinalLang = JSON.parse(localStorage.getItem("savedFinalLang")) || {};

textareaInput.addEventListener("change", alteraBotao);
textareaInput.addEventListener("click", alteraBotao);
textareaInput.addEventListener("focus", alteraBotao);
textareaInput.addEventListener("keyup", alteraBotao);
textareaInput.addEventListener("mouseover", alteraBotao);
flechaDupla.addEventListener("click", trocaIdioma);

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
const langInicial = document.getElementById("initialLang");
langInicial.value = savedInitialLang;
const langDestino = document.getElementById("finalLang")
langDestino.value = savedFinalLang;

console.log(langInicial.value);
console.log(langDestino.value);

flecha.addEventListener("click", function() {

    let langInicialTemporaria = langInicial.value;
    let langDestinoTemporaria = langDestino.value;
    const text = document.getElementById("text").value;
    const div = document.querySelector("#translation");

    localStorage.setItem("savedInitialLang", JSON.stringify(langInicialTemporaria));
    localStorage.setItem("savedFinalLang", JSON.stringify(langDestinoTemporaria));
    fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${langInicialTemporaria}|${langDestinoTemporaria}`)
    .then(response => response.json()) 
    
    .then(data => {

        if(translationBox == true){
            document.querySelector("#translationBox").remove()
            translationBox = false;
        }

        let conteudo = data.responseData.translatedText;
        let translation = document.createElement("textarea");
        translation.setAttribute("id", "translationBox");
        translation.setAttribute("disabled", "");
        div.appendChild(translation);
        translation.innerHTML = conteudo;
        translationBox = true;
    })
    .catch(function(error) {
        console.log(error);
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

function trocaIdioma() {
    let langInicialTemporaria = langInicial.value;
    let langDestinoTemporaria = langDestino.value;

    langInicial.value = langDestinoTemporaria;
    langDestino.value = langInicialTemporaria;

    localStorage.setItem("savedInitialLang", JSON.stringify(langDestinoTemporaria));
    localStorage.setItem("savedFinalLang", JSON.stringify(langInicialTemporaria))
console.log("click");
}