const startBtnEl = document.querySelector('[data-start]')
const stopBtnEl = document.querySelector('[data-stop]')
const bodyEl = document.body

startBtnEl.addEventListener('click', onBtnStart)
stopBtnEl.addEventListener('click', onBtnStop)

let idSetIntr = null;

function onBtnStart(){
   idSetIntr = setInterval(()=>{ bodyEl.style.backgroundColor = getRandomHexColor()}, 1000) 
   startBtnEl.disabled = true;
   stopBtnEl.disabled = false;

}

function onBtnStop(){
    clearInterval(idSetIntr)
    stopBtnEl.disabled = true;
    startBtnEl.disabled = false;


}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }