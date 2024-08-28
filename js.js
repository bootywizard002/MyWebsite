// Selectors
const navBarIcon = document.querySelector('.navicon-container');
const navBarIconIcon = document.querySelector('.navbar-icon');
const filmIcon = document.querySelector('.film-item');
const bookIcon = document.querySelector('.book-item');
const hobbiesIcon = document.querySelector('.hobbies-item');
const projectsIcon = document.querySelector('.projects-item');
const navigationBar = document.querySelector('.navbar');
const csvUrl = 'abilities.csv';
const abilityList = document.querySelector('.ability-list');
// Event listeners
navBarIcon.addEventListener('click', navbarPressed);
window.addEventListener('DOMContentLoaded', buildAbilities);
//Hobbygrid
filmIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = '#2a2e2f ';
  bookIcon.style.backgroundColor = '#414342';
  hobbiesIcon.style.backgroundColor = '#414342';
  projectsIcon.style.backgroundColor = '#414342';
});

bookIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = '#4D443A';
  filmIcon.style.backgroundColor = '#DB4C4D';
  hobbiesIcon.style.backgroundColor = '#DB4C4D';
  projectsIcon.style.backgroundColor = '#DB4C4D';
  // document.body.style.backgroundColor = '#B22222';
  // filmIcon.style.backgroundColor = '#E2563D';
  // hobbiesIcon.style.backgroundColor = '#E2563D';
  // projectsIcon.style.backgroundColor = '#E2563D';
});
hobbiesIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = '#1A2634';
  filmIcon.style.backgroundColor = '#3A78B7';
  bookIcon.style.backgroundColor = '#3A78B7';
  projectsIcon.style.backgroundColor = '#3A78B7';
});
projectsIcon.addEventListener('mouseenter', () => {
  document.body.style.backgroundColor = '#CE8F11';
  filmIcon.style.backgroundColor = '#EFB540';
  hobbiesIcon.style.backgroundColor = '#EFB540';
  bookIcon.style.backgroundColor = '#EFB540';
});

filmIcon.addEventListener('mouseleave', resetBackgroundColors);
bookIcon.addEventListener('mouseleave', resetBackgroundColors);
projectsIcon.addEventListener('mouseleave', resetBackgroundColors);
hobbiesIcon.addEventListener('mouseleave', resetBackgroundColors);

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

function resetBackgroundColors() {
  document.body.style.backgroundColor = '';
  bookIcon.style.backgroundColor = '';
  hobbiesIcon.style.backgroundColor = '';
  projectsIcon.style.backgroundColor = '';
  filmIcon.style.backgroundColor = '';
}

function buildAbilities() {
  console.log('hello');
  fetch(csvUrl)
    .then((response) => response.text())
    .then((text) => {
      const results = Papa.parse(text, { header: false, skipEmptyLines: true });
      console.log(results);
      const data = results.data;
      for (let index = 0; index < data.length; index++) {
        if (data[index][0] !== '') {
          const titleElement = document.createElement('li');
          titleElement.className = 'ability-title';
          titleElement.textContent = `${data[index][0]}`;
          abilityList.appendChild(titleElement);
        }
        const abilityContainer = document.createElement('li');
        abilityContainer.className = 'ability';
        const ability = document.createElement('span');
        ability.textContent = `${data[index][1]}`;
        abilityContainer.appendChild(ability);
        for (let star = 0; star < data[index][2]; star++) {
          const starsolid = document.createElement('i');
          starsolid.className = 'fa-solid fa-star';
          abilityContainer.appendChild(starsolid);
        }
        for (let star = data[index][2]; star < 5; star++) {
          const starsolid = document.createElement('i');
          starsolid.className = 'fa-regular fa-star';
          abilityContainer.appendChild(starsolid);
        }
        abilityList.appendChild(abilityContainer);
      }
    })
    .catch((error) => {
      console.error('Error fetching or parsing data:', error);
    });
}

// function parseCSV(text) {
//   const rows = text.trim().split('\n');
//   const data = rows.map((row) => row.split(','));
//   return data;
// }
