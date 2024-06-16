import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', onSubmit);

function createPromise(delay, radioCheck) {  
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radioCheck === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
                
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);                
            }
            }, delay)     
        })
         
    return promise;
}



function onSubmit(evt) {
    evt.preventDefault();

    const delay = Number(formElem.elements.delay.value);
    const radioCheck = formElem.elements.state.value;

    createPromise(delay, radioCheck)
        .then((message) => {
            iziToast.success({                
                message: message,
                messageColor: '#fff',
                color: '#64b56a',
                position: 'topRight',
                iconColor:'#fff',
});
    }).catch((message) => {
        iziToast.error({   
            message: message,
            position: 'topRight',
            messageColor: '#fff',
            iconColor:'#fff',
});
    })
    
}




