function changeColor() { 
    var userColor = document.getElementById('colorID').value;
    localStorage.setItem('storedValue', document.body.style.backgroundColor = userColor);
  }
  
  // if there is a value stored, update color picker and background color
  if(localStorage.storedValue) {
    document.getElementById('colorID').value = localStorage.storedValue;
    document.body.style.backgroundColor      = localStorage.storedValue;
  }