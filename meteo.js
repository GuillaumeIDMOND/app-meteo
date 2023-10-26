let ville;

/* Date et Heure */
function dateEtHeure() {
  const infos = new Date();
  const joursSemaine = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const jour = joursSemaine[infos.getDay()];
  const jourMois = infos.getDate();
  const moisAnnee = mois[infos.getMonth()];
  const annee = infos.getFullYear();
  document.getElementById("hour").innerHTML =
    " " + affichZero(infos.getHours()) + ":" + affichZero(infos.getMinutes());
  document.getElementById("date").innerHTML =
    " " + jour + " " + jourMois + " " + moisAnnee + " " + annee;

  const date2 = new Date(infos);
  date2.setHours(date2.getHours() + 24);
  document.getElementById("date2").innerHTML = "Demain";

  const date3 = new Date(infos);
  date3.setHours(date3.getHours() + 48);
  document.getElementById("date3").innerHTML =
    " " + joursSemaine[date3.getDay()] + " " + date3.getDate();

  const date4 = new Date(infos);
  date4.setHours(date4.getHours() + 72);
  document.getElementById("date4").innerHTML =
    " " + joursSemaine[date4.getDay()] + " " + date4.getDate();

  const date5 = new Date(infos);
  date5.setHours(date5.getHours() + 96);
  document.getElementById("date5").innerHTML =
    " " + joursSemaine[date5.getDay()] + " " + date5.getDate();
}

window.onload = function () {
  setInterval("dateEtHeure()", 100);
};

/* Si inf a 10 ajoute un zéro */
function affichZero(nombre) {
  return nombre < 10 ? "0" + nombre : nombre;
}

/* Carousel colonne gauche */
document.addEventListener("DOMContentLoaded", function () {
  const weatherInfo = document.querySelectorAll(".weather-info");
  const nextButton = document.getElementById("arrowUp");
  const prevButton = document.getElementById("arrowDown");
  let currentItem = 0;

  function showWeather(index) {
    weatherInfo.forEach((info) => (info.style.display = "none"));
    weatherInfo[index].style.display = "block";

    if (index === 0) {
      prevButton.style.display = "none";
    } else {
      prevButton.style.display = "block";
    }
  }
  function nextWeather() {
    currentItem = (currentItem + 1) % weatherInfo.length;
    showWeather(currentItem);
  }
  function prevWeather() {
    currentItem = (currentItem - 1 + weatherInfo.length) % weatherInfo.length;
    showWeather(currentItem);
  }
  nextButton.addEventListener("click", nextWeather);
  prevButton.addEventListener("click", prevWeather);
  document.querySelector("#left_column").appendChild(prevButton);
  document.querySelector("#left_column").appendChild(nextButton);
  showWeather(currentItem);
});

/* CARROUSEL MAIN */
document.addEventListener("DOMContentLoaded", function () {
  const itemInfo = document.querySelectorAll(".item");
  const leftButton = document.getElementById("arrowLeft");
  const rightButton = document.getElementById("arrowRight");
  const visibleItems = 4;
  let currentItem = 1;

  function showItems(startIndex) {
    for (let i = 0; i < itemInfo.length; i++) {
      const offset = (i - startIndex + itemInfo.length) % itemInfo.length;
      itemInfo[i].style.display = offset < visibleItems ? "block" : "none";
    }
    if (currentItem === 1) {
      rightButton.style.display = "none";
    } else {
      rightButton.style.display = "block";
    }
    if (currentItem === 5) {
      leftButton.style.display = "none";
      itemInfo[8].style.display = "none";
    } else {
      leftButton.style.display = "block";
    }
  }

  function nextItems() {
    currentItem = (currentItem - 4) % itemInfo.length;
    showItems(currentItem);
  }

  function prevItems() {
    currentItem = (currentItem + 4 + itemInfo.length) % itemInfo.length;
    showItems(currentItem);
  }

  leftButton.addEventListener("click", prevItems);
  rightButton.addEventListener("click", nextItems);
  showItems(currentItem);
});

/* GEOLOCALISATION */
function getWeatherByGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          long +
          "&lang=fr&units=metric&appid=b6efccec75c83da73bd77983d7aedf14"
      )
        .then((response) => response.json())
        .then((data) => {
          search_input.value = data.name;
          town();
          ville = data.name;
          updateCityName(ville);
        });
    });
  }
}

// Dans la fonction searchByCityName(cityName)
function searchByCityName(cityName) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&lang=fr&units=metric&appid=b6efccec75c83da73bd77983d7aedf14"
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        town();
        ville = cityName;
        updateCityName(ville);
      } else {
        alert("Nom de ville non valide !");
      }
    });
}

// Dans la fonction updateCityName(name)
function updateCityName(name) {
  document.getElementById("name").innerHTML = name;
}
// Événement de chargement de la page
window.addEventListener("load", () => {
  getWeatherByGeoLocation();
});
// Événement de pression de touche
document
  .getElementById("search_input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchByCityName(search_input.value);
    }
  });

function town() {
  const apiKey = "b6efccec75c83da73bd77983d7aedf14";
  const champValue = search_input.value;

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      champValue +
      "&lang=fr&units=metric&appid=" +
      apiKey
  )
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log(data);

      /* AFFICHAGE DONNEES DU MOMENT */
      const currentTemperature = Math.floor(data.list[0].main.temp);
      const currentDesc = data.list[0].weather[0].description;

      document.getElementById("name").innerHTML = data.city.name;
      document.getElementById("temp").innerHTML = currentTemperature + "°C";
      document.getElementById("imgMeteo").getElementsByTagName("img")[0].src =
        "http://openweathermap.org/img/wn/" +
        data.list[0].weather[0].icon +
        ".png";
      document.getElementById("desc").innerHTML = currentDesc;

      /* AFFICHAGE +24H */
      const tomorrowTemperature = Math.floor(data.list[8].main.temp);
      const tomorrowDesc = data.list[8].weather[0].description;

      document.getElementById("temp2").innerHTML = tomorrowTemperature + "°C";
      document.getElementById("imgMeteo2").getElementsByTagName("img")[0].src =
        "http://openweathermap.org/img/wn/" +
        data.list[8].weather[0].icon +
        ".png";
      document.getElementById("desc2").innerHTML = tomorrowDesc;

      /* AFFICHAGE +48H */
      const daythreeTemperature = Math.floor(data.list[16].main.temp);
      const daythreeDesc = data.list[16].weather[0].description;

      document.getElementById("temp3").innerHTML = daythreeTemperature + "°C";
      document.getElementById("imgMeteo3").getElementsByTagName("img")[0].src =
        "http://openweathermap.org/img/wn/" +
        data.list[16].weather[0].icon +
        ".png";
      document.getElementById("desc3").innerHTML = daythreeDesc;

      /* AFFICHAGE +72H */
      const dayfourTemperature = Math.floor(data.list[24].main.temp);
      const dayfourDesc = data.list[24].weather[0].description;

      document.getElementById("temp4").innerHTML = dayfourTemperature + "°C";
      document.getElementById("imgMeteo4").getElementsByTagName("img")[0].src =
        "http://openweathermap.org/img/wn/" +
        data.list[24].weather[0].icon +
        ".png";
      document.getElementById("desc4").innerHTML = dayfourDesc;

      /* AFFICHAGE +96H */
      const dayfiveTemperature = Math.floor(data.list[32].main.temp);
      const dayfiveDesc = data.list[32].weather[0].description;

      document.getElementById("temp5").innerHTML = dayfiveTemperature + "°C";
      document.getElementById("imgMeteo5").getElementsByTagName("img")[0].src =
        "http://openweathermap.org/img/wn/" +
        data.list[32].weather[0].icon +
        ".png";
      document.getElementById("desc5").innerHTML = dayfiveDesc;

      /* REMPLISSAGE SLIDER MAIN BOX */

      for (let i = 1; i < 8; i++) {
        document
          .getElementsByClassName("item")
          [i].getElementsByTagName("p")[0].textContent =
          new Date(data.list[i - 1].dt * 1000).getHours() + "h";
        document
          .getElementsByClassName("item")
          [i].getElementsByTagName("img")[0].src =
          "http://openweathermap.org/img/wn/" +
          data.list[i - 1].weather[0].icon +
          ".png";
        document
          .getElementsByClassName("item")
          [i].getElementsByTagName("p")[1].textContent =
          Math.floor(data.list[i - 1].main.temp) + "°C";
      }
    });
  document.getElementById("search_input").value = "";
}
