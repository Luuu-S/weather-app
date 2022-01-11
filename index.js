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

function showForecast() {
  let forecast = document.querySelector("#weather-forecast-temp")
  let forecastHTML = `<div class="row">`;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  days.forEach(function(day) {
    forecastHTML = forecastHTML +`
                <div class="col-2">
                  <p>
                    <img src="images/sunny.png" width="50px" /> <br />
                    19℃
                    <br />${day}
                  </p>
                </div>`
})
  forecast.innerHTML = forecastHTML;
    forecastHTML = forecastHTML + `</div>`
}

function changeTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let icon = document.querySelector("#weather-icon")
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  temperature.innerHTML = Math.round(`${response.data.main.temp}`)
  celsius = response.data.main.temp
  document.querySelector("#humidity").innerHTML=`${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}`;
  document.querySelector("#weather-desc").innerHTML = `${response.data.weather[0].description}`
  document.querySelector("h2#city").innerHTML = `${response.data.name}`;
}

let formOne = document.querySelector("#search-city-form");
formOne.addEventListener("submit", submitForm);

function currentLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlPos = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlPos).then(changeTemperature);
}

function newPos(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocationTemp);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", newPos);

function changeToFahrenheit(event) {
event.preventDefault(); 
let temperatureElement = document.querySelector("#temperature")
let imperialUnit = Math.round((celsius*9) /5+32);
celsiusTemp.classList.remove("not-active")
fahrenheitTemp.classList.add("not-active")
temperatureElement.innerHTML = imperialUnit
}

function changeToCelsius(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature")
fahrenheitTemp.classList.remove("not-active")
celsiusTemp.classList.add("not-active")
temperatureElement.innerHTML = Math.round(celsius);
}

let celsius = null;

let fahrenheitTemp = document.querySelector("#fahrenheit-link")
fahrenheitTemp.addEventListener("click", changeToFahrenheit)

let celsiusTemp = document.querySelector("#celsius-link")
celsiusTemp.addEventListener("click", changeToCelsius)

search("Oslo");
showForecast()