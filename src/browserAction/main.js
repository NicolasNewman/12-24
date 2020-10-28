import './style.less';

const btnEnable = document.querySelector('#btnEnable');
const btnSettings = document.querySelector('#btnSettings');
const enableText = document.querySelector('#enable-text');

const btnGreen = 'btn-green';
const btnRed = 'btn-red';

console.log('main.js for action');
console.log(btnEnable);
console.log(btnSettings);
console.log(enableText);

btnEnable.onclick = (e) => {
    console.log('CLICKED');
    if (btnEnable.classList.contains(btnGreen)) {
        btnEnable.classList.remove(btnGreen);
        btnEnable.classList.add(btnRed);
        enableText.innerHTML = 'disabled';
    } else {
        btnEnable.classList.remove(btnRed);
        btnEnable.classList.add(btnGreen);
        enableText.innerHTML = 'enabled';
    }
};

btnSettings.onclick = (e) => {};
