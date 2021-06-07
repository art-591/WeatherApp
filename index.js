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
  let time = document.querySelector("h2");
  time.innerHTML = `${weekday} ${hour}:${minute}`;
}

function getWeatherData(response) {
  console.log(response.data);
  let temperature = response.data.main.temp;
  let temp = document.querySelector("#temp-now");
  temperature = Math.round(temperature);
  console.log(temperature);
  temp.innerHTML = `${temperature}°`;
  let city = response.data.name;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `${city}`;
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  city = city.value;
  //let cityName = document.querySelector("h1");
  //cityName.innerHTML = `${city}`;
  let apiKey = "1f6bf5f6e1d5da325c16280778c22717";
  let apiBase = "https://api.openweathermap.org/data/2.5/weather?";
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

currentTime(new Date());

let searchCity = document.querySelector("#search-engine");
searchCity.addEventListener("submit", citySearch);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", currentPosition);

//function celsiusTemp(event) {
//event.preventDefault();
//let temperature = document.querySelector("#temp-now");
//temperature.innerHTML = `17°`;
//let celsius = document.querySelector("#celsius");
//celsius.innerHTML = `<strong> C </strong>`;
//let farenheit = document.querySelector("#farenheit");
//farenheit.innerHTML = `F`;
//}

//function farenheitTemp(event) {
//event.preventDefault();
//let temperature = document.querySelector("#temp-now");
//temperature.innerHTML = `62°`;
//let farenheit = document.querySelector("#farenheit");
//farenheit.innerHTML = `<strong> F </strong>`;
//let celsius = document.querySelector("#celsius");
//celsius.innerHTML = `C`;
//}

//let degreesF = document.querySelector("#farenheit");
//degreesF.addEventListener("click", farenheitTemp);

//let degreesC = document.querySelector("#celsius");
//degreesC.addEventListener("click", celsiusTemp);
