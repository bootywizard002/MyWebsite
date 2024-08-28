//Get the modal
var modal = document.getElementById('imageModal');

//Get the image and insert it inside the model
var img = document.querySelector('.origami-image');
var modalImg = document.getElementById('img01');

img.onclick = function () {
  modal.style.display = 'block';
  modalImg.src = this.src;
};

var span = document.getElementById('close');

span.onclick = function () {
  console.log('the cross was clicked');
  modal.style.display = 'none';
};

window.onclick = function (event) {
  console.log('window is clicked');
  if (event.target == modal) {
    console.log('hit on modal');
    modal.style.display = 'none';
  }
};
