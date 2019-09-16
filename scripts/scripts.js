const header = document.querySelector("#header");

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
  if (last_known_scroll_position > 0) {
    header.className = 'inverted';
  } else {
    header.classList.remove('inverted');
  }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});
