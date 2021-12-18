let currently = new Date();
let dateText = document.querySelector("#date-time");
let apiKey = `49d9c181d922054a5e05d69244b39ef4`;
let currentHour = currently.getHours();
let currentMinutes = currently.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currently.getDay()];

dateText.innerHTML = `${day}, ${currentHour}:${currentMinutes}`;

function search(city)
{let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(changeTemperature);
}
function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function changeCurrentTempPos(response) {
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("h2#city");
  city.innerHTML = `${response.data.name}`;
  temperature.innerHTML = Math.round(`${response.data.main.temp}`);
}

function changeTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(`${response.data.main.temp}`)
  document.querySelector("h2#city").innerHTML = `${response.data.name}`;
}

let formOne = document.querySelector("#search-city-form");
formOne.addEventListener("submit", submitForm);

function currentLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlPos = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlPos).then(changeCurrentTempPos);
}

function newPos(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocationTemp);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", newPos);

search("Oslo");