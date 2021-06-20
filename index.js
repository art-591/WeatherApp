function currentTime(data) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[data.getDay()];
  let hour = data.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = data.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let time = document.querySelector("#current-time");
  time.innerHTML = `${weekday} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecastData(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    console.log(index);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
  <div class="weekday">${formatDay(forecastDay.dt)}</div>
  <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          class="icon"
        />
  <div class="daily-temps">
  <span class="high">${Math.round(forecastDay.temp.max)}°</span>
  <span class="low">${Math.round(forecastDay.temp.min)}°</span>
  </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastUrl(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "1f6bf5f6e1d5da325c16280778c22717";
  let urlBase = `https://api.openweathermap.org/data/2.5/onecall?`;
  let units = "imperial";
  let apiUrl = `${urlBase}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getForecastData);
  console.log(apiUrl);
}

function getWeatherData(response) {
  let temp = document.querySelector("#temp-now");
  tempNow = Math.round(response.data.main.temp);
  temp.innerHTML = `${tempNow}`;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let skies = document.querySelector(".sky");
  skies.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} miles/hr`;
  let icon = document.querySelector(".current-emoji");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let coords = response.data.coord;
  getForecastUrl(coords);
}

function citySearch(event) {
  event.preventDefault();
  let apiBase = "https://api.openweathermap.org/data/2.5/weather?";
  let city = document.querySelector("#city-input");
  city = city.value;
  let apiKey = "1f6bf5f6e1d5da325c16280778c22717";
  let units = "imperial";
  let apiUrl = `${apiBase}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeatherData);
}

function currentCoordinates(position) {
  let urlBase = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "1f6bf5f6e1d5da325c16280778c22717";
  let apiUrl = `${urlBase}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeatherData);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(currentCoordinates);
}

let tempNow = null;

currentTime(new Date());

let searchCity = document.querySelector("#search-engine");
searchCity.addEventListener("submit", citySearch);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", currentPosition);
