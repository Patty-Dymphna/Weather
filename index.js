function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
  }
  
  function formatDay(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }
  
  function displayForecast(response) {
    console.log(response);
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
  
    forecast.forEach(function (day, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          ` 
          <div class="col-2">
              <div class="forecast-day">${formatDay(day.time)}</div>
                <img src=http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  day.condition.icon
                }.png
     alt=" " id="forecast-icon" class="forecast-icon" />
                <div class="forecast-temperature">
                  <span class="forecast-temp-max">${Math.round(
                    day.temperature.maximum
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    day.temperature.minimum
                  )}°</span>
                </div>
          </div>`;
      }
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.temperature.current
    );
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#humidity").innerHTML =
      response.data.temperature.humidity;
    document.querySelector("#conditions").innerHTML =
      response.data.condition.description;
    document.querySelector("#datetime").innerHTML = formatDate(
      response.data.time * 1000
    );
  
    celsiusTemperature = response.data.temperature.current;
  
    let icon = document.querySelector("#current-icon");
    icon.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  }
  
  function searchCity(city) {
    let apiKey = "3f13b36870a140370o5a7d2421cfba7t";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    axios.get(apiUrlForecast).then(displayForecast);
  }
  
  function submitSearch(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input");
    searchCity(city.value);
  }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    document.querySelector("#current-temp").innerHTML = Math.round(
      fahrenheitTemperature
    );
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    document.querySelector("#current-temp").innerHTML =
      Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  }
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  
  document
    .querySelector(".search-engine")
    .addEventListener("submit", submitSearch);
  
  searchCity("London");
  displayForecast();