// Get the image and insert it inside the modal
var images = document.querySelectorAll('.origami-image');
var modalImg = document.getElementById('img01');
var modal = document.getElementById('imageModal');

// Close button for the modal
var span = document.getElementById('close');
span.onclick = function () {
  console.log('the cross was clicked');
  modal.style.display = 'none';
};

// Close modal when clicking outside of it
window.onclick = function (event) {
  // Close if clicked outside of the modal content or on the 'close' button
  if (event.target == modal) {
    console.log('Modal closed');
    modal.style.display = 'none';
  }
};

window.addEventListener('DOMContentLoaded', function () {
  buildOrigami('origami.csv', dataArranged);
  buildPlants('plants.csv', dataArrangedPlants);
});
// Origami data storage
let origamiData = [];
const column1 = document.getElementById('column01');
const column2 = document.getElementById('column02');
const column3 = document.getElementById('column03');
const column4 = document.getElementById('column04');
let dataArranged = [];
let dataArrangedPlants = [];

// Function to parse data from CSV
function parseData(path) {
  return fetch(path)
    .then((response) => response.text())
    .then((text) => {
      // Parse the CSV data
      const results = Papa.parse(text, { header: true, skipEmptyLines: true });

      // Save the parsed data to origamiData
      origamiData = results.data;

      // Log the parsed data to verify
      console.log('Parsed Data:', origamiData);

      // Return the data for further processing
      return origamiData;
    })
    .catch((error) => {
      console.error('Error fetching or parsing the CSV file:', error);
    });
}

// Function to group and label data by model
function groupAndLabelData(data) {
  if (!origamiData || origamiData.length === 0) {
    console.error('origamiData is empty. Make sure to call parseData() first.');
    return;
  }

  // Group data by model
  let groupedByModel = {};

  origamiData.forEach((item) => {
    const model = item.Model;

    // Check if the model already has an array in groupedByModel
    if (!groupedByModel[model]) {
      // If not, create an empty array for this model
      groupedByModel[model] = [];
    }

    // Add the item to the corresponding array in groupedByModel
    groupedByModel[model].push(item);
  });

  // Iterate over the groupedByModel object
  Object.values(groupedByModel).forEach((itemArray) => {
    // Iterate over each item in the array and assign a label
    itemArray.forEach((item, index) => {
      // Add the label to the item at the same level as Model, ImageHeight, etc.
      item.label = index + 1;
    });
  });

  return Object.values(groupedByModel);
}

function buildPlants(csvUrl, data) {
  console.log('buildplants started');

  parseData(csvUrl).then(() => {
    // Call groupAndLabelData after parseData is complete
    dataArrangedPlants = groupAndLabelData(origamiData);
    let column3Height = 0;
    let column4Height = 0;

    for (const category in dataArrangedPlants) {
      if (dataArrangedPlants.hasOwnProperty(category)) {
        const items = dataArrangedPlants[category];

        if (items.length > 0) {
          let heightRatio = items[0].ImageHeight / items[0].ImageWidth;
          console.log(heightRatio);

          // Creating Image container
          const imageContainer = document.createElement('div');
          imageContainer.className = `image-container`;
          imageContainer.id = `${items[0].Title}`;

          // Creating image
          const origamiImage = document.createElement('img');
          origamiImage.className = 'origami-image';
          origamiImage.src = items[0].SourceFile;
          origamiImage.id = items[0].Title;

          // Creating top overlay
          const topOverlay = document.createElement('div');
          topOverlay.className = 'top-overlay';
          const topOverlaySpan = document.createElement('span');
          topOverlaySpan.className = 'image-number';
          topOverlaySpan.textContent = `${items[0].label}/${items.length}`;
          const rightArrow = document.createElement('i');
          rightArrow.className = 'fa-solid fa-arrow-right-long';
          const leftArrow = document.createElement('i');
          leftArrow.className = 'fa-solid fa-arrow-left-long';

          topOverlay.appendChild(topOverlaySpan);
          topOverlay.appendChild(rightArrow);
          topOverlay.appendChild(leftArrow);

          // Add navigation functionality
          let currentIndex = 0;

          rightArrow.onclick = function () {
            // Move to the next image, loop to the first if at the end
            currentIndex = (currentIndex + 1) % items.length;
            updateImage(currentIndex);
          };

          leftArrow.onclick = function () {
            // Move to the previous image, loop to the last if at the beginning
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateImage(currentIndex);
          };

          function updateImage(index) {
            // Update the image source
            origamiImage.src = items[index].SourceFile;
            // Update the label
            topOverlaySpan.textContent = `${items[index].label}/${items.length}`;
          }

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
          iconTextInfo.textContent = `${items[0].Artist}`;

          const iconBoxDownload = document.createElement('a');
          iconBoxDownload.className = 'icon-box';
          iconBoxDownload.href = `${items[0].SourceFile}`;
          iconBoxDownload.download = 'Origami Image';
          const downloadIcon = document.createElement('i');
          downloadIcon.className = 'fa-solid fa-circle-arrow-down';
          const iconTextDownload = document.createElement('span');
          iconTextDownload.className = 'icon-text';
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

          // Append container to columns based on height ratio
          if (column3Height >= column4Height) {
            column4.appendChild(imageContainer);
            column4Height += heightRatio;
          } else {
            column3.appendChild(imageContainer);
            column3Height += heightRatio;
          }
        }
      }
    }
    bindImageClickEvents();
  });
}
function buildOrigami(csvUrl) {
  console.log('buildorigami started');

  parseData(csvUrl).then((origamiData) => {
    // Call groupAndLabelData after parseData is complete
    dataArranged = groupAndLabelData(origamiData);

    let column1Height = 0;
    let column2Height = 0;

    for (const category in dataArranged) {
      if (dataArranged.hasOwnProperty(category)) {
        const items = dataArranged[category];

        if (items.length > 0) {
          let heightRatio = items[0].ImageHeight / items[0].ImageWidth;
          console.log(heightRatio);

          // Creating Image container
          const imageContainer = document.createElement('div');
          imageContainer.className = `image-container`;
          imageContainer.id = `${items[0].Title}`;

          // Creating image
          const origamiImage = document.createElement('img');
          origamiImage.className = 'origami-image';
          origamiImage.src = items[0].SourceFile;
          origamiImage.id = items[0].Title;

          // Creating top overlay
          const topOverlay = document.createElement('div');
          topOverlay.className = 'top-overlay';
          const topOverlaySpan = document.createElement('span');
          topOverlaySpan.className = 'image-number';
          topOverlaySpan.textContent = `${items[0].label}/${items.length}`;
          const rightArrow = document.createElement('i');
          rightArrow.className = 'fa-solid fa-arrow-right-long';
          const leftArrow = document.createElement('i');
          leftArrow.className = 'fa-solid fa-arrow-left-long';

          topOverlay.appendChild(topOverlaySpan);
          topOverlay.appendChild(rightArrow);
          topOverlay.appendChild(leftArrow);

          // Add navigation functionality
          let currentIndex = 0;

          rightArrow.onclick = function () {
            // Move to the next image, loop to the first if at the end
            currentIndex = (currentIndex + 1) % items.length;
            updateImage(currentIndex);
          };

          leftArrow.onclick = function () {
            // Move to the previous image, loop to the last if at the beginning
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateImage(currentIndex);
          };

          function updateImage(index) {
            // Update the image source
            origamiImage.src = items[index].SourceFile;
            // Update the label
            topOverlaySpan.textContent = `${items[index].label}/${items.length}`;
          }

          // Creating bottom overlay
          // const link = 'https://jonakashima.com.br/';
          const bottomOverlay = document.createElement('div');
          bottomOverlay.classList = 'bottom-overlay';

          const iconBoxInfo = document.createElement('a');
          iconBoxInfo.className = 'icon-box';
          // iconBoxInfo.href = `${link}`;
          const infoIcon = document.createElement('i');
          infoIcon.className = 'fa-solid fa-circle-info';
          const iconTextInfo = document.createElement('span');
          iconTextInfo.className = 'icon-text';
          iconTextInfo.textContent = `${items[0].Artist}`;

          const iconBoxDownload = document.createElement('a');
          iconBoxDownload.className = 'icon-box';
          iconBoxDownload.href = `${items[0].SourceFile}`;
          iconBoxDownload.download = 'Origami Image';
          const downloadIcon = document.createElement('i');
          downloadIcon.className = 'fa-solid fa-circle-arrow-down';
          const iconTextDownload = document.createElement('span');
          iconTextDownload.className = 'icon-text';
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

          // Append container to columns based on height ratio
          if (column1Height >= column2Height) {
            column2.appendChild(imageContainer);
            column2Height += heightRatio;
          } else {
            column1.appendChild(imageContainer);
            column1Height += heightRatio;
          }
        }
      }
    }
    bindImageClickEvents();
  });
}
// Show more button click Events
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
  } else {
    // If collapsed, expand it and fix button at the bottom right
    galleryContainer.style.height = expandedHeight;
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.margin = '0'; // Reset margin
    this.innerHTML = '<i class="fa fa-chevron-up"></i> Show Less';
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
document.getElementById('toggleButton2').addEventListener('click', function () {
  const galleryContainer = document.querySelector('.plant-gallery');
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
  } else {
    // If collapsed, expand it and fix button at the bottom right
    galleryContainer.style.height = expandedHeight;
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.margin = '0'; // Reset margin
    this.innerHTML = '<i class="fa fa-chevron-up"></i> Show Less';
  }
});
window.addEventListener('scroll', function () {
  const galleryContainer = document.querySelector('.plant-gallery');
  const button = document.getElementById('toggleButton2');

  const expandedHeight = galleryContainer.scrollHeight + 'px';
  // Calculate the gallery's position relative to the viewport
  const rect = galleryContainer.getBoundingClientRect();
  const containerBottom = rect.bottom;
  const containerTop = rect.top;
  const windowHeight = window.innerHeight;

  // Check if the bottom of the gallery is within the viewport
  if (containerBottom <= windowHeight || containerTop >= windowHeight) {
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

function bindImageClickEvents() {
  var images = document.querySelectorAll('.origami-image, .plant-image');

  images.forEach((image) => {
    image.onclick = function () {
      // Open the modal
      modal.style.display = 'block';

      // Clear existing modal content images
      const existingModalImages = document.querySelectorAll('.modal-content');
      existingModalImages.forEach((img) => modal.removeChild(img));
      const existingWhitespace = document.querySelectorAll('.whitespace');
      existingWhitespace.forEach((ws) => modal.removeChild(ws));
      const imgSrc = this.id;
      console.log('Image clicked:', imgSrc);

      // Find the array containing the model of the clicked image
      let containingArray = dataArranged.find((subArray) =>
        subArray.some((item) => item.Title === imgSrc)
      );

      // If not found, search in dataArrangedPlants
      if (!containingArray) {
        containingArray = dataArrangedPlants.find((subArray) =>
          subArray.some((item) => item.Title === imgSrc)
        );
      }

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
  });
}
