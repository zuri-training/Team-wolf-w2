'use strict'

const logoutBtn = document.getElementById('logout-menu-item');
const overlay = document.querySelector('.overlay');
const logoutPopUp = document.querySelector('.logout-popup');
const cancelBtn = document.querySelector('.logout-cancel');

console.log("hello")

logoutBtn.addEventListener('click', () => {
    console.log("click");
    overlay.style.display = "block";
    logoutPopUp.style.display = "block";
});

cancelBtn.addEventListener('click', () => {
    overlay.style.display = "none";
    logoutPopUp.style.display = "none";
});