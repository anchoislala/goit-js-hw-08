import throttle from 'lodash.throttle';
import { Report } from 'notiflix/build/notiflix-report-aio';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

let inputValues = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.inputEmail.addEventListener('input', throttle(onValuesInput, 500));
refs.textarea.addEventListener('input', throttle(onValuesInput, 500));

onValuesComplete();

function onFormSubmit(evt) {
    evt.preventDefault();

    if (refs.inputEmail.value === '' || refs.textarea.value === '') {
        return Report.failure("Все поля должны быть заполнены!");     
    }

    console.log(inputValues);

    evt.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
 }


function onValuesInput(evt) {
     inputValues = {
        email: refs.inputEmail.value,
        message: refs.textarea.value,
}
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputValues));
}

function onValuesComplete(evt) {
    
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
        refs.inputEmail.value = JSON.parse(savedData).email;
        refs.textarea.value = JSON.parse(savedData).message;
    }
}