//Get the modal
var modal = document.getElementById('imageModal');

//Get the image and insert it inside the model
var images = document.querySelectorAll('.origami-image');
var modalImg = document.getElementById('img01');

images.forEach(function (img) {
  img.onclick = function () {
    modal.style.display = 'block';
    modalImg.src = this.src;
  };
});

var span = document.getElementById('close');

span.onclick = function () {
  console.log('the cross was clicked');
  modal.style.display = 'none';
};

window.onclick = function (event) {
  //   console.log('window is clicked');
  if (event.target == modal) {
    console.log('hit on modal');
    modal.style.display = 'none';
  }
};

function scrollToTop(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth scrolling
  });
}
//navbar selectors
const navBarIcon = document.querySelector('.navicon-container');
const navBarIconIcon = document.querySelector('.navbar-icon');
const navigationBar = document.querySelector('.navbar');
navBarIcon.addEventListener('click', navbarPressed);
function navbarPressed() {
  console.log('hello');
  navigationBar.classList.toggle('active'); // Toggle visibility class

  // Toggle icon classes
  navBarIconIcon.classList.toggle('fa-xmark');
  navBarIconIcon.classList.toggle('fa-bars');
}
