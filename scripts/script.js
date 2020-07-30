/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
// openweatherapikey
const apiKey = "723fba59b6dff986d2f18f9395721519";
// event listener submit
form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather, coord } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption class="descriptioncolor">${weather[0]["description"]}</figcaption>
        </figure>
        <div class="descriptioncolor">Air Humidity: ${main.humidity}</div>
		<div class="descriptioncolor">Coordinates: Lon:${coord.lon}, Lat:${coord.lat}</div>

      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

// autocomplete


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
};


// autocomplete array + conversion

let cities = [
    {
        "city": "Vienna", 
        "admin": "Wien", 
        "country": "Austria", 
        "population_proper": "1731000", 
        "iso2": "AT", 
        "capital": "primary", 
        "lat": "48.2", 
        "lng": "16.366667", 
        "population": "2400000"
    }, 
    {
        "city": "Linz", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "181162", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "48.3", 
        "lng": "14.3", 
        "population": "349161"
    }, 
    {
        "city": "Graz", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "222326", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "47.066667", 
        "lng": "15.45", 
        "population": "263234"
    }, 
    {
        "city": "Salzburg", 
        "admin": "Salzburg", 
        "country": "Austria", 
        "population_proper": "150269", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "47.8", 
        "lng": "13.033333", 
        "population": "206279"
    }, 
    {
        "city": "Innsbruck", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "112467", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "47.266667", 
        "lng": "11.4", 
        "population": "155214"
    }, 
    {
        "city": "Klagenfurt", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "86566", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "46.624722", 
        "lng": "14.305278", 
        "population": "90610"
    }, 
    {
        "city": "Wiener Neustadt", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "38481", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.8", 
        "lng": "16.25", 
        "population": "82762"
    }, 
    {
        "city": "Bregenz", 
        "admin": "Vorarlberg", 
        "country": "Austria", 
        "population_proper": "26928", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "47.5", 
        "lng": "9.766667", 
        "population": "26928"
    }, 
    {
        "city": "Eisenstadt", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "13165", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "47.85", 
        "lng": "16.516667", 
        "population": "13165"
    }, 
    {
        "city": "Dornbirn", 
        "admin": "Vorarlberg", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.416667", 
        "lng": "9.733056", 
        "population": ""
    }, 
    {
        "city": "Deutschlandsberg", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.815278", 
        "lng": "15.222222", 
        "population": ""
    }, 
    {
        "city": "Hartberg", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.283333", 
        "lng": "15.966667", 
        "population": ""
    }, 
    {
        "city": "V\u00f6cklabruck", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.016667", 
        "lng": "13.65", 
        "population": ""
    }, 
    {
        "city": "Judenburg", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.166667", 
        "lng": "14.666667", 
        "population": ""
    }, 
    {
        "city": "Villach", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.610278", 
        "lng": "13.855833", 
        "population": ""
    }, 
    {
        "city": "Sankt Johann im Pongau", 
        "admin": "Salzburg", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.35", 
        "lng": "13.2", 
        "population": ""
    }, 
    {
        "city": "Voitsberg", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.033333", 
        "lng": "15.15", 
        "population": ""
    }, 
    {
        "city": "Zwettl", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.616667", 
        "lng": "15.166667", 
        "population": ""
    }, 
    {
        "city": "Scheibbs", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.0", 
        "lng": "15.166667", 
        "population": ""
    }, 
    {
        "city": "Kirchdorf", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.9", 
        "lng": "14.116667", 
        "population": ""
    }, 
    {
        "city": "Gmunden", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.916667", 
        "lng": "13.8", 
        "population": ""
    }, 
    {
        "city": "Hollabrunn", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.55", 
        "lng": "16.083333", 
        "population": ""
    }, 
    {
        "city": "Wels", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.166667", 
        "lng": "14.033333", 
        "population": ""
    }, 
    {
        "city": "Gm\u00fcnd", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.766667", 
        "lng": "14.983333", 
        "population": ""
    }, 
    {
        "city": "V\u00f6lkermarkt", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.662222", 
        "lng": "14.634444", 
        "population": ""
    }, 
    {
        "city": "Kitzb\u00fchel", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.45", 
        "lng": "12.383333", 
        "population": ""
    }, 
    {
        "city": "Freistadt", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.5", 
        "lng": "14.5", 
        "population": ""
    }, 
    {
        "city": "Tulln", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.333333", 
        "lng": "16.05", 
        "population": ""
    }, 
    {
        "city": "Schwaz", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.333333", 
        "lng": "11.7", 
        "population": ""
    }, 
    {
        "city": "Tamsweg", 
        "admin": "Salzburg", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.133333", 
        "lng": "13.8", 
        "population": ""
    }, 
    {
        "city": "Mistelbach", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.57", 
        "lng": "16.576667", 
        "population": ""
    }, 
    {
        "city": "Zell am See", 
        "admin": "Salzburg", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.316667", 
        "lng": "12.783333", 
        "population": ""
    }, 
    {
        "city": "Sankt P\u00f6lten", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "admin", 
        "lat": "48.2", 
        "lng": "15.633333", 
        "population": ""
    }, 
    {
        "city": "Horn", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.65", 
        "lng": "15.65", 
        "population": ""
    }, 
    {
        "city": "Leibnitz", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.781667", 
        "lng": "15.541667", 
        "population": ""
    }, 
    {
        "city": "Perg", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.25", 
        "lng": "14.633333", 
        "population": ""
    }, 
    {
        "city": "Amstetten", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.116667", 
        "lng": "14.866667", 
        "population": ""
    }, 
    {
        "city": "Korneuburg", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.35", 
        "lng": "16.333333", 
        "population": ""
    }, 
    {
        "city": "Rohrbach", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.566667", 
        "lng": "13.983333", 
        "population": ""
    }, 
    {
        "city": "Lienz", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.831111", 
        "lng": "12.759722", 
        "population": ""
    }, 
    {
        "city": "Hermagor", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.627222", 
        "lng": "13.367222", 
        "population": ""
    }, 
    {
        "city": "Reutte", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.483333", 
        "lng": "10.716667", 
        "population": ""
    }, 
    {
        "city": "Bruck an der Mur", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.416667", 
        "lng": "15.283333", 
        "population": ""
    }, 
    {
        "city": "Bruck an der Leitha", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.016667", 
        "lng": "16.766667", 
        "population": ""
    }, 
    {
        "city": "Imst", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.233333", 
        "lng": "10.733333", 
        "population": ""
    }, 
    {
        "city": "Leoben", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.383333", 
        "lng": "15.1", 
        "population": ""
    }, 
    {
        "city": "Sankt Veit an der Glan", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.768056", 
        "lng": "14.360278", 
        "population": ""
    }, 
    {
        "city": "G\u00e4nserndorf", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.338876", 
        "lng": "16.722157", 
        "population": ""
    }, 
    {
        "city": "Melk", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.216667", 
        "lng": "15.316667", 
        "population": ""
    }, 
    {
        "city": "Hallein", 
        "admin": "Salzburg", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.683333", 
        "lng": "13.1", 
        "population": ""
    }, 
    {
        "city": "Mattersburg", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.733333", 
        "lng": "16.4", 
        "population": ""
    }, 
    {
        "city": "Feldkirchen", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.716667", 
        "lng": "14.1", 
        "population": ""
    }, 
    {
        "city": "Murau", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.110556", 
        "lng": "14.169444", 
        "population": ""
    }, 
    {
        "city": "Feldbach", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.953056", 
        "lng": "15.888333", 
        "population": ""
    }, 
    {
        "city": "Bludenz", 
        "admin": "Vorarlberg", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.149722", 
        "lng": "9.816667", 
        "population": ""
    }, 
    {
        "city": "Krems an der Donau", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.416667", 
        "lng": "15.6", 
        "population": ""
    }, 
    {
        "city": "M\u00f6dling", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.083333", 
        "lng": "16.283333", 
        "population": ""
    }, 
    {
        "city": "Klosterneuburg", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.3", 
        "lng": "16.316667", 
        "population": ""
    }, 
    {
        "city": "Steyr", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.05", 
        "lng": "14.416667", 
        "population": ""
    }, 
    {
        "city": "Neusiedl am See", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.933333", 
        "lng": "16.833333", 
        "population": ""
    }, 
    {
        "city": "Neunkirchen", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.716667", 
        "lng": "16.083333", 
        "population": ""
    }, 
    {
        "city": "Wolfsberg", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.840556", 
        "lng": "14.844167", 
        "population": ""
    }, 
    {
        "city": "Landeck", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.133333", 
        "lng": "10.566667", 
        "population": ""
    }, 
    {
        "city": "Eferding", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.316667", 
        "lng": "14.016667", 
        "population": ""
    }, 
    {
        "city": "Weiz", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.216667", 
        "lng": "15.616667", 
        "population": ""
    }, 
    {
        "city": "Spittal an der Drau", 
        "admin": "K\u00e4rnten", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.8", 
        "lng": "13.5", 
        "population": ""
    }, 
    {
        "city": "Waidhofen an der Thaya", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.816667", 
        "lng": "15.283333", 
        "population": ""
    }, 
    {
        "city": "Rust", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.8", 
        "lng": "16.666667", 
        "population": ""
    }, 
    {
        "city": "Baden", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.016667", 
        "lng": "16.233333", 
        "population": ""
    }, 
    {
        "city": "Liezen", 
        "admin": "Steiermark", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.566667", 
        "lng": "14.233333", 
        "population": ""
    }, 
    {
        "city": "Oberwart", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.283333", 
        "lng": "16.2", 
        "population": ""
    }, 
    {
        "city": "Ried im Innkreis", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.216667", 
        "lng": "13.5", 
        "population": ""
    }, 
    {
        "city": "Oberpullendorf", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.5", 
        "lng": "16.516667", 
        "population": ""
    }, 
    {
        "city": "G\u00fcssing", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.066667", 
        "lng": "16.333333", 
        "population": ""
    }, 
    {
        "city": "Grieskirchen", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.233333", 
        "lng": "13.833333", 
        "population": ""
    }, 
    {
        "city": "Sch\u00e4rding", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.45", 
        "lng": "13.433333", 
        "population": ""
    }, 
    {
        "city": "Lilienfeld", 
        "admin": "Nieder\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.016667", 
        "lng": "15.633333", 
        "population": ""
    }, 
    {
        "city": "Jennersdorf", 
        "admin": "Burgenland", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "46.939167", 
        "lng": "16.146667", 
        "population": ""
    }, 
    {
        "city": "Kufstein", 
        "admin": "Tirol", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "47.583333", 
        "lng": "12.166667", 
        "population": ""
    }, 
    {
        "city": "Braunau am Inn", 
        "admin": "Ober\u00f6sterreich", 
        "country": "Austria", 
        "population_proper": "", 
        "iso2": "AT", 
        "capital": "minor", 
        "lat": "48.266667", 
        "lng": "13.033333", 
        "population": ""
    }
];

var result = cities.map(name => name.city );

autocomplete(document.getElementById("myInput"), result);
