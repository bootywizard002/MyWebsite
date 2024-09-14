const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

const colors = [
  '#ef2a2a',
  '#f03029',
  '#f13628',
  '#f23b27',
  '#f34026',
  '#f44524',
  '#f54a23',
  '#f54e22',
  '#f65221',
  '#f75720',
  '#f85b1f',
  '#f85e1d',
  '#f9621c',
  '#f9661b',
  '#fa6a1a',
  '#fa6e19',
  '#fb7117',
  '#fb7516',
  '#fc7815',
  '#fc7c14',
  '#fd7f13',
  '#fd8312',
  '#fd8611',
  '#fe8910',
  '#fe8d10',
  '#fe900f',
  '#fe930f',
  '#ff970f',
  '#ff9a0f',
  '#ff9d0f',
  '#ffa010',
  '#ffa410',
  '#ffa711',
  '#ffaa13',
  '#ffad14',
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener('mousemove', function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + 'px';
    circle.style.top = y - 12 + 'px';

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

const pre = document.querySelector('.card');

document.addEventListener('mousemove', (e) => {
  rotateElement(e, pre);
});

function rotateElement(event, element) {
  // get mouse position
  const x = event.clientX;
  const y = event.clientY;
  //   console.log(x, y);

  // find the middle
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;
  //   console.log(middleX, middleY);

  // get offset from middle as a percentage
  // and tone it down a little
  const offsetX = ((x - middleX) / middleX) * 30;
  const offsetY = ((y - middleY) / middleY) * 30;
  //   console.log(offsetX, offsetY);

  // set rotation
  element.style.setProperty('--rotateX', -1 * offsetY + 'deg'); // Rotate along X-axis when moving up/down
  element.style.setProperty('--rotateY', offsetX + 'deg'); // Rotate along Y-axis when moving left/right
}

//  Scroll Animations
gsap.registerPlugin(ScrollTrigger);
gsap.from('.scroller.s2 .scrolling-text.small', {
  y: '50vh',
  opacity: 0, // Start with an opacity of 0 (invisible)
  duration: 1, // Duration of the animation
  scrollTrigger: {
    trigger: '.scroller.s2', // Trigger the animation when .scroller.s3 comes into view
    toggleActions: 'restart reverse reverse pause', // Control how the animation behaves on scroll events
    start: 'top 50%', // When the top of .scroller.s3 reaches 80% of the viewport height
    end: 'bottom 120%', // When the bottom of .scroller.s3 reaches 20% of the viewport height
    markers: true, // Enable markers for debugging (remove this in production)
    scrub: 3,
  },
});
gsap.from('.scroller.s2 .scrolling-text.big', {
  y: '-50vh',
  opacity: 0, // Start with an opacity of 0 (invisible)
  duration: 1, // Duration of the animation
  scrollTrigger: {
    trigger: '.scroller.s2', // Trigger the animation when .scroller.s3 comes into view
    toggleActions: 'restart reverse reverse pause', // Control how the animation behaves on scroll events
    start: 'top 50%', // When the top of .scroller.s3 reaches 80% of the viewport height
    end: 'bottom 120%', // When the bottom of .scroller.s3 reaches 20% of the viewport height
    markers: true, // Enable markers for debugging (remove this in production)
    scrub: 3,
  },
});
gsap.from('.scroller.s3 .scrolling-text.small', {
  x: '100vw',
  opacity: 0, // Start with an opacity of 0 (invisible)
  duration: 1, // Duration of the animation
  scrollTrigger: {
    trigger: '.scroller.s3', // Trigger the animation when .scroller.s3 comes into view
    toggleActions: 'restart pause reverse pause', // Control how the animation behaves on scroll events
    start: 'top 70%', // When the top of .scroller.s3 reaches 80% of the viewport height
    end: 'bottom 120%', // When the bottom of .scroller.s3 reaches 20% of the viewport height
    // markers: true, // Enable markers for debugging (remove this in production)
    scrub: 5,
  },
});
gsap.from('.scroller.s3 .scrolling-text.big', {
  x: '-100vw',
  opacity: 0, // Start with an opacity of 0 (invisible)
  duration: 1, // Duration of the animation
  scrollTrigger: {
    trigger: '.scroller.s3', // Trigger the animation when .scroller.s3 comes into view
    toggleActions: 'restart pause reverse pause', // Control how the animation behaves on scroll events
    start: 'top 70%', // When the top of .scroller.s3 reaches 80% of the viewport height
    end: 'bottom 120%', // When the bottom of .scroller.s3 reaches 20% of the viewport height
    // markers: true, // Enable markers for debugging (remove this in production)
    scrub: 5,
  },
});
