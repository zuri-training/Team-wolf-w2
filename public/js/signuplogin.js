"use strict";

// assign variables
const userInput = document.getElementById("password");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const number = document.getElementById("number");
const length = document.getElementById("length");

// show message when user clicks password field
userInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
};

// hide message when user clicks outside password field
userInput.onblur = function () {
  document.getElementById("message").style.display = "none";
};

// check user input in password field
userInput.onkeyup = function () {
  // validate lowercase
  const lowercaseLetters = /[a-z]/g;
  if (userInput.value.match(lowercaseLetters)) {
    lowercase.classList.remove("invalid");
    lowercase.classList.add("valid");
  } else {
    lowercase.classList.remove("valid");
    lowercase.classList.add("invalid");
  }

  // validate uppercase
  const uppercaseLetters = /[A-Z]/g;
  if (userInput.value.match(uppercaseLetters)) {
    uppercase.classList.remove("invalid");
    uppercase.classList.add("valid");
  } else {
    uppercase.classList.remove("valid");
    uppercase.classList.add("invalid");
  }

  // validate number
  const numbers = /[0-9]/g;
  if (userInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // validate length
  if (userInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};
