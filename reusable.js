const navBarIcon = document.querySelector('.navicon-container');
const navBarIconIcon = document.querySelector('.navbar-icon');
const filmIcon = document.querySelector('.film-item');
const bookIcon = document.querySelector('.book-item');
const hobbiesIcon = document.querySelector('.hobbies-item');
const projectsIcon = document.querySelector('.projects-item');
const navigationBar = document.querySelector('.navbar');
navBarIcon.addEventListener('click', navbarPressed);
function scrollToTop(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth scrolling
  });
}
function navbarPressed() {
  console.log('hello');
  navigationBar.classList.toggle('active'); // Toggle visibility class

  // Toggle icon classes
  navBarIconIcon.classList.toggle('fa-xmark');
  navBarIconIcon.classList.toggle('fa-bars');
}
