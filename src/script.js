function formatDate(timestamp) {
  let date = new Date(timestamp);
  let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
  ];
  let currentDay = weekDays[date.getDay()];
  return `${currentDay} ${formatHours(timestamp)}`;
}

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  maximumCelsiusTemperature = response.data.main.temp_max;
  minimumCelsiusTemperature = response.data.main.temp_min;
  document.querySelector("#currentTemperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#max-temp").innerHTML = Math.round(maximumCelsiusTemperature);
  document.querySelector("#min-temp").innerHTML = Math.round(minimumCelsiusTemperature);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#main-icon").setAttribute("alt", response.data.weather[0].description);
  
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
 }

 function formatHours (timestamp) {
   let date = new Date(timestamp);
   let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
 }

 function displayForecast (response) {
   let forecastElement = document.querySelector("#forecast");
   forecastElement.innerHTML = null;
   let forecast = null;

   for (let index = 0; index < 6; index++) {
     forecast = response.data.list[index];
     forecastElement.innerHTML += `<div class="col-2">
    <p class="week-day">
     ${formatHours(forecast.dt * 1000)}
    </p>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="other-weather-icons" />
    <div class="forecast-temperature">
    <p>
    <span class="maximum-temp"> ${Math.round(forecast.main.temp_max)}°</span>
    /
    <span class="minimum-temp">${Math.round(forecast.main.temp_min)}°</span>
    </p>
    </div>
    </div>`;
   } 
 }

 function searchCity(city) {
    let apiKey = "4b590c33d87dbad37bb78d97de248093";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
 }

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

function changeToCelsius (event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.setAttribute("class", "inactive");
  celsiusLink.setAttribute("class", "active");
  document.querySelector("#max-temp").innerHTML = Math.round(maximumCelsiusTemperature);
  document.querySelector("#min-temp").innerHTML = Math.round(minimumCelsiusTemperature);
}
function changeToFahrenheit (event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  let fahrenheitTemperature = celsiusTemperature * 9 / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#max-temp").innerHTML = Math.round(maximumCelsiusTemperature * 9 / 5 + 32);
  document.querySelector("#min-temp").innerHTML = Math.round(minimumCelsiusTemperature * 9 / 5 + 32);
  fahrenheitLink.setAttribute("class", "active");
  celsiusLink.setAttribute("class", "inactive");

}

function showPositionWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4b590c33d87dbad37bb78d97de248093";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

let celsiusTemperature = null;
let maximumCelsiusTemperature = null;
let minimumCelsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentPositionButton = document.querySelector("#current-button");
currentPositionButton.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);
searchCity("Porto");