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
