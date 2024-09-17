//Modal Functionality
//when any book is hit
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('modal-img');
const modalAuthor = document.querySelector('.modal .author');
const modalGenre = document.querySelector('.modal .genre');
const modalGoogleRating = document.querySelector('.modal .gRating');
const modalReview = document.querySelector('.modal .review-text');
const modalTitle = document.querySelector('.modal .title');
const modalReleaseDate = document.querySelector('.modal .release-date');
const starcontainer = document.querySelector('.modal .rating');
let parsedBooksData = [];

document
  .querySelector('.book-gallery')
  .addEventListener('click', function (event) {
    if (event.target.closest('.book-wrapper')) {
      const bookId = event.target.closest('.book-wrapper').id;
      console.log(bookId);
      // Show the modal and update its content based on the book ID
      modal.classList.add('show');
      modalBookinfo =
        parsedBooksData[
          parsedBooksData.findIndex((subArray) => subArray[1] === `${bookId}`)
        ];
      console.log(
        'this is the book info of the book with Id',
        bookId,
        modalBookinfo
      );
      modalAuthor.textContent = modalBookinfo[3];
      modalImg.src = modalBookinfo[8];
      modalGenre.innerHTML = `<b>Genre: </b> ${modalBookinfo[7]}`;
      modalGoogleRating.innerHTML = `<b>Online Rating:</b> ${modalBookinfo[9]}`;
      modalReview.textContent = modalBookinfo[5];
      modalTitle.textContent = modalBookinfo[2];
      modalReleaseDate.textContent = `Published: ${modalBookinfo[4]}`;
      let noOfStars = modalBookinfo[6];
      console.log(noOfStars);
      starcontainer.replaceChildren();
      for (let star = 1; star <= noOfStars; star++) {
        const starsolid = document.createElement('i');
        starsolid.className = 'fa-solid fa-star';
        starcontainer.appendChild(starsolid);
      }
      if (noOfStars % 1 !== 0) {
        noOfStars = Math.floor(noOfStars);
        noOfStars++;
        const starsolid = document.createElement('i');
        starsolid.className = 'fa-regular fa-star-half-stroke';
        starcontainer.appendChild(starsolid);
      }
      for (let star = noOfStars; star < 5; star++) {
        const starsolid = document.createElement('i');
        starsolid.className = 'fa-regular fa-star ';
        starcontainer.appendChild(starsolid);
      }
    }
  });

//closing the modal
const closeButton = document.querySelector('.fa-xmark');
closeButton.addEventListener('click', closeButtonPressed);

function closeButtonPressed() {
  console.log('closebutton pressed');
  modal.classList.remove('show');
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove('show');
  }
};
// #region building books
//Create books
const bookGallery = document.querySelector('.book-gallery');

// const books = document.querySelector('.books');
const csv = 'movies.csv';
// window.addEventListener('DOMContentLoaded', buildBooks);
buildBooks();
function buildBooks() {
  console.log('building books');
  fetch(csv)
    .then((response) => response.text())
    .then((text) => {
      const results = Papa.parse(text, {
        header: false,
        skipEmptyLines: true,
      });
      const data = results.data;
      parsedBooksData = results.data;
      console.log('this is not', parsedBooksData);
      let books;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element[0] !== '') {
          const titleSpan = document.createElement('span');
          titleSpan.className = 'category-title';
          titleSpan.textContent = `${element[0]}`;
          bookGallery.appendChild(titleSpan);
          const horizontalLine = document.createElement('hr');
          bookGallery.appendChild(horizontalLine);

          books = document.createElement('div');
          books.className = 'books';
          bookGallery.appendChild(books);
        }
        const bookWrapper = document.createElement('div');
        bookWrapper.className = 'book-wrapper';
        const book = document.createElement('div');
        book.className = 'book';
        bookWrapper.id = `${element[1]}`;
        book.innerHTML = `<img src="${element[8]}">`;
        bookWrapper.appendChild(book);
        books.appendChild(bookWrapper);
        //create stars from csv rating
        noOfStars = element[6];

        for (let star = 1; star <= noOfStars; star++) {
          const starsolid = document.createElement('i');
          starsolid.className = 'fa-solid fa-star';
          bookWrapper.appendChild(starsolid);
        }
        if (noOfStars % 1 !== 0) {
          noOfStars = Math.floor(noOfStars);
          noOfStars++;
          const starsolid = document.createElement('i');
          starsolid.className = 'fa-regular fa-star-half-stroke';
          bookWrapper.appendChild(starsolid);
        }
        for (let star = noOfStars; star < 5; star++) {
          const starsolid = document.createElement('i');
          starsolid.className = 'fa-regular fa-star ';
          bookWrapper.appendChild(starsolid);
        }
      }
    });
}
// #endregion
