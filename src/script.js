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
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

function showWeather(response) {
  document.querySelector("#currentTemperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#main-icon").setAttribute("alt", response.data.weather[0].description);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
 }

 function searchCity(city) {
    let apiKey = "4b590c33d87dbad37bb78d97de248093";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(showWeather);
 }

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

function changeToCelsius (event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = 19;
}
function changeToFahrenheit (event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = 66;
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
  navigator.geolocation.getCurrentPosition(showPositionWeather)
}



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#degrees");
celsiusLink.addEventListener("click", changeToCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let currentPositionButton = document.querySelector("#current-button");
currentPositionButton.addEventListener("click", getCurrentPosition);

searchCity("Porto");