const apiKey = '98f5bb55869ee5bfe4049963eac127ff';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

var locationinput = "";
var unit = "";

function GetLocation() {
  locationinput = event.currentTarget.value;
}

function GetMetric() {
  unit = event.currentTarget.value;
}

function LocationValidation() {

  const specials = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g

  if (specials.test(locationinput) === true || locationinput.trim() === '') {
    const disableBtn = document.getElementById('fetch-btn')
    disableBtn.setAttribute('disabled', true)
    disableBtn.style.backgroundColor = "red";
    document.getElementById('location').style.border = "2px solid red"
  }else{
    console.log("valid input")
  }
}

async function fetchApi() {
  if (location) {
    const url = `${apiUrl}?q=${locationinput}&appid=${apiKey}&units=${unit}`;
    console.log(unit)
    
    try {
      const response = await fetch(url);
      const ApiData = await response.json();
      return  ApiData; 
    } catch (error) {
      return {
        "status" : false,
        "message" : "some error occured"
      } 
    }
  }
  
}

async function WeatherDetails() {
  const ApiData = await fetchApi();
  const locationText = document.getElementById('location-text');
      const temperatureText = document.getElementById('temperature-text');
      const descriptionText = document.getElementById('description-text');
    
      locationText.textContent = `Location: ${ApiData.name}`;
      temperatureText.textContent = `Temperature: ${Math.round(ApiData.main.temp)} ${unit === 'metric' ? 'C' : 'F'}`;
      descriptionText.textContent = `Description: ${ApiData.weather[0].description}`;
}