const apiKey = '98f5bb55869ee5bfe4049963eac127ff';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

var inputLocation = "";
var unit = "metric";

function setLocation() {
  inputLocation = event.currentTarget.value;
}

function setMetric() {
  unit = event.currentTarget.value;
}

function locationValidation() {

  const specials = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g

  if (specials.test(inputLocation) === true || inputLocation.trim() === '') {
    const disableBtn = document.getElementById('fetch-btn')
    disableBtn.setAttribute('disabled', true)
    disableBtn.style.backgroundColor = "red";
    document.getElementById('location').style.border = "2px solid red"
  } else {
    console.log("valid input")
  }
}

async function fetchWeatherDetailsFromApi() {
  if (location) {
    const url = `${apiUrl}?q=${inputLocation}&appid=${apiKey}&units=${unit}`;
    console.log(unit)

    try {
      const response = await fetch(url);
      const apiData = await response.json();
      return apiData;
    } catch (error) {
      return {
        "status": false,
        "message": "some error occured"
      }
    }
  }

}

async function fetchWeatherDetails() {
  const apiData = await fetchWeatherDetailsFromApi();
  if (apiData.status === false) {
    alert(apiData.message + "while fetching api")
  }
  const locationLabel = document.getElementById('location-text');
  const temperatureLabel = document.getElementById('temperature-text');
  const weatherDescription = document.getElementById('description-text');

  locationLabel.textContent = `Location: ${apiData.name}`;
  temperatureLabel.textContent = `Temperature: ${Math.round(apiData.main.temp)} ${unit === 'metric' ? 'C' : 'F'}`;
  weatherDescription.textContent = `Description: ${apiData.weather[0].description}`;
}