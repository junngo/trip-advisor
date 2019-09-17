const header = document.querySelector("#header");
const fp_from = flatpickr("#from", {defaultDate: "today", minDate: "today"});
const fp_to = flatpickr("#to", {minDate: "today"});

const searchForm = document.querySelector("#form-search");


// Submit Event
const API_URL = 'https://javascript-basic.appspot.com/searchLocation';

async function handleSubmit(event) {
  event.preventDefault();

  let from_date = fp_from.formatDate(new Date(), "Y-m-d");
  let to_date = fp_to.formatDate(new Date(), "Y-m-d");

  await fetch(API_URL+`?from=${from_date}&to=${to_date}`)
  .then(response => response.json())
  .then(json => {
      console.log(json)
    }
  );

}


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

      searchForm.addEventListener("submit", handleSubmit);
}

init()
