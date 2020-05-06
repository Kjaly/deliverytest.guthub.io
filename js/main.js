'use strict';
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const  buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants= document.querySelector('.cards-restaurants');
const containerPromo= document.querySelector('.container-promo');
const restaurants= document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('clrDelivery');

function toggleModal() {
  modal.classList.toggle("is-open");
}

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

function creatCardRestaurant() {
  const card = `
<a class="card card-restaurant">
  <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title">Тануки</h3>
      <span class="card-tag tag">60 мин</span>
    </div>
<!-- /.card-heading -->
     <div class="card-info">
       <div class="rating">
       4.5
       </div>
       <div class="price">От 1 200 ₽</div>
       t<div class="category">Суши, роллы</div>
     </div>
    </div>
</a>
`;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood(){
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend',`
\t\t\t\t\t\t<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
\t\t\t\t\t\t<div class="card-text">
\t\t\t\t\t\t\t<div class="card-heading">
\t\t\t\t\t\t\t\t<h3 class="card-title card-title-reg">Пицца Классика</h3>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-info">
\t\t\t\t\t\t\t\t<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
\t\t\t\t\t\t\t\t\tгрибы.
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-buttons">
\t\t\t\t\t\t\t\t<button class="button button-primary button-add-cart">
\t\t\t\t\t\t\t\t\t<span class="button-card-text">В корзину</span>
\t\t\t\t\t\t\t\t\t<span class="button-cart-svg"></span>
\t\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t\t\t<strong class="card-price-bold">510 ₽</strong>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
  `);
  cardsMenu.insertAdjacentElement('beforeend',card);
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  // console.log(restaurant);

  if ((restaurant) && (login)) {
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');



    createCardGood();
    createCardGood();
    createCardGood();
  } else {
    toggleModalAuth();
  }

}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click',function (){
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})
checkAuth();

creatCardRestaurant();
creatCardRestaurant();
creatCardRestaurant();

