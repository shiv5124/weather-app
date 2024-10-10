const apiKey = '98f5bb55869ee5bfe4049963eac127ff';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

var location = '';
var unit ='';

function checkLocat(event){
location = event.target.value;
}

function checkMetric(event){
unit =event.target.value;
}

async function fetchWeather() {
   /* const locationInput = document.querySelector(".locat")
    const unitSelect = document.querySelector(".temp-unit")
    const location = locationInput.value;
    const unit = unitSelect.value;*/
  
    if (location) {
      const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${unit}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        const locationText = document.getElementById('location-text');
        const temperatureText = document.getElementById('temperature-text');
        const descriptionText = document.getElementById('description-text');
  
        locationText.textContent = `Location: ${data.name}`;
        temperatureText.textContent = `Temperature: ${Math.round(data.main.temp)} ${unit === 'metric' ? 'C' : 'F'}`;
        descriptionText.textContent = `Description: ${data.weather[0].description}`;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  }

                                    
