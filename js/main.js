const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

const  buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('clrDelivery');

function toggleModalAuth(){
  loginInput.placeholder = '';
  loginInput.style.borderColor = '';
  modalAuth.classList.toggle('is-open');
}


function authorized() {
  function logOut(){
    login = null;
    localStorage.removeItem('clrDelivery');
    buttonAuth.style.display= '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut)

    notAuthorized();
  }
  console.log ('Авторизован');
  userName.textContent = login;
  buttonAuth.style.display= 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut)
}


function maskInput(string) {
  return !!string.trim()
}
function notAuthorized() {
  function logIn(event){
    event.preventDefault();
    if (maskInput(loginInput.value)){

      login = loginInput.value;
      localStorage.setItem('clrDelivery', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn)
      logInForm.reset();
      checkAuth()
    } else {
      loginInput.style.borderColor = 'red';
      loginInput.placeholder = 'Введите логин';

      }
    }

  buttonAuth.addEventListener('click' , toggleModalAuth);
  closeAuth.addEventListener('click' , toggleModalAuth);
  logInForm.addEventListener('submit', logIn)
  console.log ('Не авторизован');

}

function  checkAuth() {
  if (login){
    authorized();
  } else {
    notAuthorized()

  }
}
notAuthorized();
