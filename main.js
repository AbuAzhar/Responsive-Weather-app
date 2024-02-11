let input = document.getElementById("search-input");
let errMsg = document.querySelector(".undefined");
let T_result = document.querySelector(".top-result");
let showResults = document.querySelector(".show-results");
let results = document.querySelector(".results");
let time = document.querySelector(".time");
let cityname = document.querySelector(".location");
let temperature = document.querySelector(".temperature");
let wind = document.querySelector(".wind");
let rain = document.querySelector(".rain");
let submit = document.getElementById("submit");
let main = document.querySelector(".main");

function fetchData() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=ff092519bc84a7badf9349529e5ce1d5`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (input.value == "" || data.cod == "404") {
        displayError();
      } else {
        displayWeatherData(data);
      }
    })
    .catch((error) => {
      console.error(error);
      displayError();
    });
}

function displayError() {
  errMsg.style.display = "block";
  T_result.style.display = "none";
  showResults.style.display = "none";
}

function displayWeatherData(data) {
  cityname.innerHTML = data.name;
  temperature.innerHTML = data["main"]["temp"];
  wind.innerHTML = data["wind"]["speed"];
  rain.innerHTML = data["weather"][0]["description"];

  let timezoneSec = data.timezone;
  let timezoneInMint = timezoneSec / 60;
  let currentUtc = new Date();
  let localTime = new Date(currentUtc.getTime() + timezoneInMint * 60000);
  let formatter = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  });
  let formateDate = formatter.format(localTime);
  time.innerHTML = ` ${formateDate}`;

  main.innerHTML = `${data["weather"][0]["description"]}`;
  let iconCode = data["weather"][0]["icon"];
  let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  // Create an image element and set its source to the dynamically determined icon URL
  let iconImg = document.createElement("img");
  iconImg.src = iconUrl;
  iconImg.alt = "Weather Icon";
  iconImg.className = "weather-icon";

  // Clear existing content in the results div and append the new icon
  results.innerHTML = "";
  results.appendChild(iconImg);

  // Update the display styles here if needed
  errMsg.style.display = "none";
  T_result.style.display = "block";
  showResults.style.display = "block";
}

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData();
});
