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

// refs.bntElem.disabled = true;
    // const inputVal = refs.input.value;
    // const initTime = new Date(inputVal);
    // const date = Date.now()
    // console.log(initTime >= date);
    // if (initTime > date) {
    //     refs.bntElem.disabled = false;
    // }


refs.bntElem.addEventListener('click', () => { 
    
    const inputVal = refs.input.value;
    const initTime = new Date(inputVal);
    const date = Date.now()
    // console.log(initTime < date);
    if (initTime > date) {
        refs.bntElem.disabled = false;
    }
    
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diff = initTime - currentTime;
        const time = convertMs(diff);
        const str = getTime(time);
        // console.log(diff);

    }, 1000);

    setTimeout(() => {
        clearInterval(intervalId);
    }, initTime - Date.now())
})

function convertMs(ms) {
  let d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
}

function getTime({d, h, m, s }) {
  d = d.toString().padStart(2, '0');  
  h = h.toString().padStart(2, '0');
  m = m.toString().padStart(2, '0');
  s = s.toString().padStart(2, '0');

    //   return `${d} ${h}:${m}:${s}`;
        refs.days.textContent = d;
        refs.hours.textContent = h;
        refs.minutes.textContent = m;
        refs.seconds.textContent = s;
}
refs.bntElem.disabled = true;

const options = {
    defaultDate: new Date(),
    enableTime: true,
    time_24hr: true,
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


