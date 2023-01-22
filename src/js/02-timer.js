import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('[data-start]')
const pickerEl = document.getElementById('datetime-picker')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

startBtnEl.addEventListener('click', onBtnStart)

startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date()
        if(selectedDates[0] < currentDate){
            return Notify.failure("Please choose a date in the future");
        }
        startBtnEl.disabled = false;  
  }
}


flatpickr(pickerEl, options);

let idSetInterval = null

function onBtnStart(){
    const selectedDate = pickerEl.value
    const expectedDate = new Date(selectedDate);
    idSetInterval = setInterval(()=>{ 
    const currentDate = new Date()
    const time = expectedDate - currentDate
    const timeData = convertMs(time)  
    const { days, hours, minutes, seconds } = timeData;
    daysEl.textContent = addLeadingZero(`${days}`)        
    hoursEl.textContent = addLeadingZero(`${hours}`)        
    minutesEl.textContent = addLeadingZero(`${minutes}`)        
    secondsEl.textContent = addLeadingZero(`${seconds}`)  
    if (time <= 1000) {
        clearInterval(idSetInterval);
        return Notify.success('The time has come!');

      }      
    }, 1000)
    startBtnEl.disabled = true;  
   
}



 function addLeadingZero(value){
    return value.padStart(2, '0')
 }
 
 function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day)
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
