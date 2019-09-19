const header = document.querySelector("#header");

const fp_from = flatpickr("#from", {defaultDate: "today", minDate: "today"});
const fp_to = flatpickr("#to", {minDate: "today"});

const searchForm = document.querySelector("#form-search");

const item_bg = document.querySelector("#list-bg"),
      item_list = item_bg.querySelector("#list-panel");

const template = document.querySelector("#list-item-template");


// Submit Event
const API_URL = 'https://javascript-basic.appspot.com/searchLocation';

async function handleSubmit(event) {
  event.preventDefault();
  while(item_list.firstChild) item_list.removeChild(item_list.firstChild);

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
      console.log(data[0]);

      item_bg.style.display = 'inline-block';
      for (let i = 0; i < data.length; i++) {
        template_node = template.cloneNode(true);
 
        template_node.querySelector(".list-item-image").src = data[i].titleImageUrl;
        template_node.querySelector(".list-item-name").innerHTML = data[i].name;
        template_node.querySelector(".list-item-city-name").innerHTML = data[i].cityName;
        
        item_list.appendChild(template_node);
      }

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

// List Click Event -> Move Page
function handleListClick(event) {
  event.preventDefault();
  console.log("list click");

  // let url = 'detail.html?id='+data.id;
  // window.location = url;
}

function init() {
  template.remove();

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
  template.addEventListener("click", handleListClick);
}

init()
