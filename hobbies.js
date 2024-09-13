//Get the modal
var modal = document.getElementById('imageModal');

//Get the image and insert it inside the model
var images = document.querySelectorAll('.origami-image');
var modalImg = document.getElementById('img01');

// images.forEach(function (img) {
//   img.onclick = function () {
//     // modal.style.display = 'block';
// });

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

//Origami Building
csvUrl = 'origami.csv';
window.addEventListener('DOMContentLoaded', buildOrigami);
const column1 = document.getElementById('column01');
const column2 = document.getElementById('column02');
let dataArranged = [];
function buildOrigami() {
  console.log('buildorigami started');
  fetch(csvUrl)
    .then((response) => response.text())
    .then((text) => {
      const results = Papa.parse(text, { header: true, skipEmptyLines: true });
      console.log(results);
      const data = results.data;
      const dataSorted = data.sort((a, b) => {
        if (a.Label === '' && b.Label !== '') {
          return 1;
        }
        if (b.Label === '' && a.Label !== '') {
          return -1;
        }
        return a.Label.localeCompare(b.Label);
      });
      dataArranged = Object.values(
        dataSorted.reduce((acc, item) => {
          const key = item.Model;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        }, {})
      );
      let column1Height = 0;
      let column2Height = 0;
      console.log(data);
      console.log(dataArranged);
      for (let index = 0; index < dataArranged.length; index++) {
        let heightRatio =
          dataArranged[index][0].ImageWidth /
          dataArranged[index][0].ImageHeight;
        console.log(heightRatio);
        // Creating Image container
        const imageContainer = document.createElement('div');
        imageContainer.className = `image-container`;
        imageContainer.id = `${dataArranged[index][0].Title}`;

        // Creating image
        const origamiImage = document.createElement('img');
        origamiImage.className = 'origami-image';
        origamiImage.src = dataArranged[index][0].SourceFile;
        origamiImage.id = dataArranged[index][0].Title;

        // Creating top overlay
        const topOverlay = document.createElement('div');
        topOverlay.className = 'top-overlay';
        const topOverlaySpan = document.createElement('span');
        topOverlaySpan.className = 'image-number';
        topOverlaySpan.textContent = `${dataArranged[index][0].Label}/${dataArranged[index].length}`;
        const rightArrow = document.createElement('i');
        rightArrow.className = 'fa-solid fa-arrow-right-long';
        const leftArrow = document.createElement('i');
        leftArrow.className = 'fa-solid fa-arrow-left-long';

        topOverlay.appendChild(topOverlaySpan);
        topOverlay.appendChild(rightArrow);
        topOverlay.appendChild(leftArrow);

        // Creating bottom overlay
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

        // Append elements to the container
        imageContainer.appendChild(origamiImage);
        imageContainer.appendChild(topOverlay);
        imageContainer.appendChild(bottomOverlay);

        // Click event for the image
        origamiImage.onclick = function () {
          // Open the modal
          modal.style.display = 'block';

          // Clear existing modal content images
          const existingModalImages =
            document.querySelectorAll('.modal-content');
          existingModalImages.forEach((img) => modal.removeChild(img));

          imgSrc = this.id;
          console.log('Image clicked:', imgSrc); // Log the image source

          // Find the array containing the model of the clicked image
          const containingArray = dataArranged.find((subArray) =>
            subArray.some((item) => item.Title === imgSrc)
          );

          if (containingArray) {
            console.log('Whole model array:', containingArray);

            // Loop through the related images and add them to the modal
            containingArray.forEach((element) => {
              const imageModal = document.createElement('img');
              imageModal.className = 'modal-content';
              imageModal.src = element.SourceFile;
              modal.appendChild(imageModal);
            });
          } else {
            console.log('No matching array found for:', imgSrc);
          }

          // Optionally add whitespace or other elements
          const whiteSpace = document.createElement('div');
          whiteSpace.className = 'whitespace';
          modal.appendChild(whiteSpace);
        };

        // Append container to columns based on height ratio
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
  const galleryContainer = document.querySelector('.origami-gallery');
  const button = this;
  const buttonIcon = this.querySelector('i');
  const expandedHeight = galleryContainer.scrollHeight + 'px';

  if (galleryContainer.style.height === expandedHeight) {
    // If expanded, collapse it and change button to fixed position
    galleryContainer.style.height = '200vh';
    button.style.position = 'static'; // Reset position for collapsing state
    button.style.textAlign = 'right'; // Align the button to the right
    button.style.margin = '20px 10px'; // Add margin to position the button
    this.innerHTML = '<i class="fa fa-chevron-down"></i> Show More';
    // galleryContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
  } else {
    // If collapsed, expand it and fix button at the bottom right
    galleryContainer.style.height = expandedHeight;
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.margin = '0'; // Reset margin
    this.innerHTML = '<i class="fa fa-chevron-up"></i> Show Less';
    // galleryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

window.addEventListener('scroll', function () {
  const galleryContainer = document.querySelector('.origami-gallery');
  const button = document.getElementById('toggleButton');

  const expandedHeight = galleryContainer.scrollHeight + 'px';
  // Calculate the gallery's position relative to the viewport
  const rect = galleryContainer.getBoundingClientRect();
  const containerBottom = rect.bottom;
  const windowHeight = window.innerHeight;

  // Check if the bottom of the gallery is within the viewport
  if (containerBottom <= windowHeight) {
    // Gallery is fully visible; reset button to static
    button.style.position = 'static';
    button.style.textAlign = 'right';
    button.style.margin = '20px 10px'; // Maintain button styling
  } else if (galleryContainer.style.height === expandedHeight) {
    // Gallery is not fully visible; fix button at bottom of viewport
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.margin = '0'; // Reset margin for fixed position
  }
});
