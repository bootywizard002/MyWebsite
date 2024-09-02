function adjustLayout() {
  const mainContainer = document.querySelector('.main-container');
  if (window.innerWidth <= 600) {
    mainContainer.classList.add('narrow');
  } else {
    mainContainer.classList.remove('narrow');
  }
}

// Run on initial load
adjustLayout();

// Add event listener for window resize
window.addEventListener('resize', adjustLayout);
