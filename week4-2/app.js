
// api url and key from openWeatherMap
const apiKey = "71db25b7f6d5f8367cd9683ee71acf7f";
const URL = "https://api.openweathermap.org/data/2.5/weather";

// variable references to input, button and weather infvariable o
var cityInput = document.getElementById("cityInput");
var button = document.getElementById("btn");
var weatherInfo = document.getElementById("weather-info");


// event listener for get weather button
button.addEventListener("click", () => {

    var cityName = cityInput.value;

    if (!cityName) {
        alert("Please enter city name!");
        return;
    } 
    
    // create api URL using string interpolation for desired city
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
    // create http request 
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', apiURL);

    // handling http status code error and api error
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var myData = JSON.parse(ourRequest.responseText);
            renderHTML(myData);
            btn.classList.add("hide-me");
        } else if (ourRequest.status === 404) {
            alert("City not found");
        } else {
            alert("Error");
        }
    };

    ourRequest.send();
});

function renderHTML(data){
    // store data from the json and update variables
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;

    // converting temperature to celsius because openweatherapi uses kelvin
    const temperatureCelsius = (temperature - 273.15).toFixed(2);

    // display weather info using html string with string interpolation
    const weatherHTML = `
    <p>Weather: ${weatherDescription}</p>
    <p>Temperature: ${temperatureCelsius} °C</p>
    <p>Wind speed: ${windSpeed} m/s</p>`;

    weatherInfo.innerHTML = weatherHTML;
}
