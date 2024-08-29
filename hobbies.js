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

//Origami Building
csvUrl = 'origami.csv';
window.addEventListener('DOMContentLoaded', buildOrigami);
const column1 = document.getElementById('column01');
const column2 = document.getElementById('column02');

function buildOrigami() {
  console.log('buildorigami started');
  fetch(csvUrl)
    .then((response) => response.text())
    .then((text) => {
      const results = Papa.parse(text, { header: true, skipEmptyLines: true });
      console.log(results);
      const data = results.data;
      let column1Height = 0;
      let column2Height = 0;
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        let heightRatio = data[index].ImageWidth / data[index].ImageHeight;
        console.log(heightRatio);
        //creating Image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        //creating image
        const origamiImage = document.createElement('img');
        origamiImage.className = 'origami-image';
        origamiImage.src = data[index].SourceFile;

        //creating top overlay
        const topOverlay = document.createElement('div');
        topOverlay.className = 'top-overlay';
        const topOverlaySpan = document.createElement('span');
        topOverlaySpan.className = 'image-number';
        topOverlaySpan.textContent = /*  ${data[index].Label} */ `1/2`;
        const rightArrow = document.createElement('i');
        rightArrow.className = 'fa-solid fa-arrow-right-long';
        const leftArrow = document.createElement('i');
        leftArrow.className = 'fa-solid fa-arrow-left-long';

        topOverlay.appendChild(topOverlaySpan);
        topOverlay.appendChild(rightArrow);
        topOverlay.appendChild(leftArrow);
        //creating bottom overlay
        const link = 'https://jonakashima.com.br/';

        const bottomOverlay = document.createElement('div');
        bottomOverlay.classList = 'bottom-overlay';

        const iconBoxInfo = document.createElement('a');
        iconBoxInfo.className = 'icon-box';
        iconBoxInfo.href = `${link}`;

        const infoIcon = document.createElement('i');
        infoIcon.className = 'fa-solid fa-circle-info';

        const iconTextInfo = document.createElement('span');
        iconTextInfo.className = 'icon-text';
        iconTextInfo.textContent = `${data[index].Artist}`;

        const iconBoxDownload = document.createElement('a');
        iconBoxDownload.className = 'icon-box';
        iconBoxDownload.href = `${data[index].SourceFile}`;
        iconBoxDownload.download = 'Origami Image';

        const downloadIcon = document.createElement('i');
        downloadIcon.className = 'fa-solid fa-circle-arrow-down';

        const iconTextDownload = document.createElement('span');
        iconTextDownload.className = 'icon-text ';
        iconTextDownload.textContent = 'Download';

        iconBoxInfo.appendChild(infoIcon);
        iconBoxInfo.appendChild(iconTextInfo);

        iconBoxDownload.appendChild(downloadIcon);
        iconBoxDownload.appendChild(iconTextDownload);

        bottomOverlay.appendChild(iconBoxInfo);
        bottomOverlay.appendChild(iconBoxDownload);

        //

        imageContainer.appendChild(origamiImage);
        imageContainer.appendChild(topOverlay);
        imageContainer.appendChild(bottomOverlay);

        origamiImage.onclick = function () {
          modal.style.display = 'block';
          modalImg.src = this.src;
        };
        if (column1Height >= column2Height) {
          column2.appendChild(imageContainer);
          column2Height += heightRatio;
        } else {
          column1.appendChild(imageContainer);
          column1Height += heightRatio;
        }
      }
    });
}

//Show more button click Events

document.getElementById('toggleButton').addEventListener('click', function () {
  const galleryContainer = document.querySelector('.origami-gallery-container');
  const buttonIcon = this.querySelector('i');

  if (galleryContainer.style.height === 'auto') {
    // If expanded, collapse it
    galleryContainer.style.height = '400vh';
    this.innerHTML = '<i class="fa fa-chevron-down"></i> Show More';
  } else {
    // If collapsed, expand it
    galleryContainer.style.height = 'auto';
    this.innerHTML = '<i class="fa fa-chevron-up"></i> Show Less';
  }
});
