import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form')
formEl.addEventListener('input', selectData)
formEl.addEventListener('submit', onFormSubmit)

const data ={}
function selectData(e){
data[e.target.name] = +e.target.value
}

function onFormSubmit(e){
  e.preventDefault();
  const {delay, step, amount} = data
  
  for(let i = 1; i <= amount; i+=1){
    let newDelay = delay + (i - 1) * step
    createPromise(i, newDelay)
  }
  e.target.reset()
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>{
  setTimeout(() =>{
  if(shouldResolve){
    resolve({ position, delay})
  }
  reject({ position, delay })
  }, delay)})
    .then(({position, delay}) =>{
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)})
    .catch(({position, delay}) =>{
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
})
  
}
  
