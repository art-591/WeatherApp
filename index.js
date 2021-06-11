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

function getWeatherData(response) {
  console.log(response.data);
  let temp = document.querySelector("#temp-now");
  tempNow = Math.round(response.data.main.temp);
  console.log(tempNow);
  temp.innerHTML = `${tempNow}°`;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let skies = document.querySelector(".sky");
  skies.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/hr`;
  let icon = document.querySelector(".current-emoji");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function citySearch(event) {
  event.preventDefault();
  let apiBase = "https://api.openweathermap.org/data/2.5/weather?";
  let city = document.querySelector("#city-input");
  city = city.value;
  let apiKey = "1f6bf5f6e1d5da325c16280778c22717";
  let units = "metric";
  let apiUrl = `${apiBase}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeatherData);
  console.log(apiUrl);
}

function currentCoordinates(position) {
  let urlBase = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "1f6bf5f6e1d5da325c16280778c22717";
  let apiUrl = `${urlBase}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeatherData);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(currentCoordinates);
}

function farenheitTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-now");
  let tempFarenheit = (tempNow * 9) / 5 + 32;
  console.log(tempFarenheit);
  temp.innerHTML = `${tempFarenheit}°`;
  celsius.classList.remove("active");
  farenheit.classList.add("active");
}

function celsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-now");
  temp.innerHTML = `${tempNow}°`;
  farenheit.classList.remove("active");
  celsius.classList.add("active");
}

let tempNow = null;

currentTime(new Date());

let searchCity = document.querySelector("#search-engine");
searchCity.addEventListener("submit", citySearch);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", currentPosition);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", farenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemp);
