// Selectors
//api testing
// const apiKey = 'AIzaSyCo0WpSqy8r6IJFrq_8q2u9gD724WBt8IM';
// const isbn = '9781398805941';
// const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`;

// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     if (data.totalItems === 0) {
//       console.log('No book found with the provided ISBN.');
//     } else {
//       console.log(data);
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

// Event Listeners

// Functions

//Modal Functionality
//when any book is hit
var bookWrapper = document.querySelectorAll('.book-wrapper');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('modal-img');
const modalAuthor = document.querySelector('.modal .author');

bookWrapper.forEach(function (book) {
  book.onclick = function () {
    const bookId = event.currentTarget.id;
    console.log(bookId);
    modal.classList.add('show');
    let bookDetails = bookData[bookId];
    if (bookDetails) {
      modalAuthor.textContent = bookDetails[1];
      modalImg.src = bookDetails[5];
    }
  };
});

let bookData = {
  b1984: [
    1984,
    'George Orwell',
    1945,
    'Very nice book I liked it very much',
    5,
    'book image.png',
  ],
};

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

//Create books
const bookGallery = document.querySelector('.book-gallery');

// const books = document.querySelector('.books');
const csv = 'books.csv';
let parsedBooksData = [];
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
        book.id = `${element[1]}`;
        book.innerHTML = `<img src="${element[8]}">`;
        bookWrapper.appendChild(book);
        books.appendChild(bookWrapper);
        //create stars from csv rating
        for (let star = 0; star < element[6]; star++) {
          const starsolid = document.createElement('i');
          starsolid.className = 'fa-solid fa-star';
          bookWrapper.appendChild(starsolid);
        }
        for (let star = element[6]; star < 5; star++) {
          const starsolid = document.createElement('i');
          starsolid.className = 'fa-regular fa-star ';
          bookWrapper.appendChild(starsolid);
        }
      }
    });
}
