const header = document.querySelector("#header");
const fp_from = flatpickr("#from", {defaultDate: "today", minDate: "today"});
const fp_to = flatpickr("#to", {minDate: "today"});

const searchForm = document.querySelector("#form-search");


// Submit Event
const API_URL = 'https://javascript-basic.appspot.com/searchLocation';

async function handleSubmit(event) {
  event.preventDefault();

  let from_full = fp_from.selectedDates[0];
  let to_full = fp_to.selectedDates[0];

  let from_date = from_full.getFullYear()+'-'+from_full.getMonth()+'-'+from_full.getDate(); 
  let to_date = to_full.getFullYear()+'-'+to_full.getMonth()+'-'+to_full.getDate(); 
  let req_url = API_URL+`?from=${from_date}&to=${to_date}`;

  var request = new XMLHttpRequest();
  request.open('GET', req_url, true);
  
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      console.log(data);

    } else {
      // We reached our target server, but it returned an error
  
    }
  };
  
  request.onerror = function() {
    // There was a connection error of some sort
  };
  
  request.send();

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
