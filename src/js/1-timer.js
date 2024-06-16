import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    input: document.querySelector('#datetime-picker'),
    bntElem: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let intervalId;
refs.bntElem.disabled = true;

const options = {
    defaultDate: new Date(),
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose(selectedDates) {        
        if (selectedDates[0] <= options.defaultDate) {
            refs.bntElem.disabled = true;
            iziToast.error({                
                message: 'Please choose a date in the future',
                theme: 'dark',
                position: 'topRight',                
                color: '#EF4040',
                iconUrl: '../img/close.png',               
                
            });
        } else {
            refs.bntElem.disabled = false;
    }
    }
}

flatpickr("#datetime-picker", options);

function convertMs(ms) {  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function getTime({days, hours, minutes, seconds }) {
    days = days.toString().padStart(2, '0');  
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
        
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

refs.bntElem.addEventListener('click', () => {    
    const inputVal = refs.input.value;
    const initTime = new Date(inputVal);
    const date = Date.now()
    
    if (initTime > date) {
        refs.bntElem.disabled = false;
    }
    
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diff = initTime - currentTime;
        const time = convertMs(diff);
        getTime(time);
        refs.bntElem.disabled = true;
        refs.input.disabled = true;
    }, 1000);

    setTimeout(() => {
        clearInterval(intervalId);
        refs.input.disabled = false;
    }, initTime - Date.now())
})
























// function conversMs() {
//     const date = new Date();
//     const day = String(date.getHours()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');

//     return {d: day, h: hours, m: minutes, s: seconds }
// }

// function getTime({d, h, m, s }) {
//     // return `${d} ${h}:${m}:${s}`;
//         refs.days.textContent = d;
//         refs.hours.textContent = h;
//         refs.minutes.textContent = m;
//         refs.seconds.textContent = s;
// }














// const initTime = Date.now();
// refs.bntElem.addEventListener('click', () => {   

//     const setTime = setInterval(convertMs, 1000);
    
// })

// function convertMs() {
//     const date = new Date();
//     const day = date.getDate().toString();
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');

//     refs.days.textContent = day;
//     refs.hours.textContent = hours;
//     refs.minutes.textContent = minutes;
//     refs.seconds.textContent = seconds;
   
// }


