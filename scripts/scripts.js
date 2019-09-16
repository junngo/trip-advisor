const header = document.querySelector("#header");
const fp_from = flatpickr("#from", {defaultDate: "today", minDate: "today"});
const fp_to = flatpickr("#to", {minDate: "today"});

// Scroll Event
let last_known_scroll_position = 0;
let ticking = false;

function scrollEventCall(scroll_pos) {
  if (last_known_scroll_position > 0) {
    header.className = 'inverted';
  } else {
    header.classList.remove('inverted');
  }
}

function init() {
    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
      
        if (!ticking) {
          window.requestAnimationFrame(function() {
            scrollEventCall(last_known_scroll_position);
            ticking = false;
          });
      
          ticking = true;
        }
      });
}

init()
