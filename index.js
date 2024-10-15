const apiKey = 'api';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

var locationinp = "";
var unit = "";

function GetLocation() {
  locationinp = event.currentTarget.value;
}

function GetMetric() {
  unit = event.currentTarget.value;
}

function LocationValidation() {

  const specials = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g
  const empty = /^$/g

  if (locationinp.match(specials) === true || locationinp.match(empty) === true) {
    const disableBtn = document.getElementById('fetch-btn')
    disableBtn.setAttribute('disabled', true)
    disableBtn.classList.add("disable")
    const wrongInp = document.getElementById('location')
    wrongInp.classList.add("disableinp")
  }
}

var url = "";
var ApiData ="";

async function fetchApi() {
  if (location) {
    url = `${apiUrl}?q=${locationinp}&appid=${apiKey}&units=${unit}`;
    console.log(unit)
    
    try {
      const response = await fetch(url);
      ApiData = await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}

async function WeatherDetails() {
  await fetchApi();
  const locationText = document.getElementById('location-text');
      const temperatureText = document.getElementById('temperature-text');
      const descriptionText = document.getElementById('description-text');
    
      locationText.textContent = `Location: ${ApiData.name}`;
      temperatureText.textContent = `Temperature: ${Math.round(ApiData.main.temp)} ${unit === 'metric' ? 'C' : 'F'}`;
      descriptionText.textContent = `Description: ${ApiData.weather[0].description}`;
}