// Selectors
const navBarIcon = document.querySelector('.navicon-container');
const navBarIconIcon = document.querySelector('.navbar-icon');
const filmIcon = document.querySelector('.film-item');
const bookIcon = document.querySelector('.book-item');
const hobbiesIcon = document.querySelector('.hobbies-item');
const projectsIcon = document.querySelector('.projects-item');
const navigationBar = document.querySelector('.navbar');
// Event listeners
navBarIcon.addEventListener('click', navbarPressed);
//Hobbygrid
filmIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = '#2a2e2f ';
  bookIcon.style.backgroundColor = '#414342';
  hobbiesIcon.style.backgroundColor = '#414342';
  projectsIcon.style.backgroundColor = '#414342';
});

filmIcon.addEventListener('mouseleave', () => {
  document.body.style.backgroundColor = '';
  bookIcon.style.backgroundColor = '';
  hobbiesIcon.style.backgroundColor = '';
  projectsIcon.style.backgroundColor = '';
});
bookIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = 'rgb(135, 206, 235)';
});
bookIcon.addEventListener('mouseleave', () => {
  document.body.style.backgroundColor = '';
});
hobbiesIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = 'rgb(144, 238, 144)';
});
hobbiesIcon.addEventListener('mouseleave', () => {
  document.body.style.backgroundColor = '';
});
projectsIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = 'rgb(255, 127, 80)';
});
projectsIcon.addEventListener('mouseleave', () => {
  document.body.style.backgroundColor = '';
});

//functions
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
