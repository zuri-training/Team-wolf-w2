'use strict'

// logout modal
const logoutBtn = document.getElementById('logout-menu-item');
const overlay = document.querySelector('.overlay');
const logoutPopUp = document.querySelector('.logout-popup');
const cancelBtn = document.querySelector('.logout-cancel');

// collapse menu
const collapseMenu = document.getElementById('collapse-menu');
const sideBarContainer = document.querySelector('.settings-container_side-bar');
const mainContainer = document.querySelector('.settings-container_main-panel');
const sideBarMenuItem = document.querySelectorAll('.side-bar_menu-item');
const sideBarMenuText = document.querySelectorAll('.side-bar_menu-text');
const collapseIcon = document.querySelector('.collapse-icon');


// logout modal popup functionality
logoutBtn.addEventListener('click', () => {
    console.log("click");
    overlay.style.display = "block";
    logoutPopUp.style.display = "block";
});

cancelBtn.addEventListener('click', () => {
    overlay.style.display = "none";
    logoutPopUp.style.display = "none";
});


// collapse menu functionality
collapseMenu.addEventListener('click', () => {
    console.log('collapse menu')
    sideBarContainer.classList.toggle('active');
    mainContainer.classList.toggle('active');
    collapseIcon.classList.toggle('active');
    sideBarMenuItem.forEach(elem => elem.classList.toggle('active'));
    sideBarMenuText.forEach(elem => elem.classList.toggle('active'));
});