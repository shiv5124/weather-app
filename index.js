const apiKey = 'api';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('fetch-btn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const locationInput = document.getElementById('location');
    const unitSelect = document.getElementById('unit');
    const location = locationInput.value;
    const unit = unitSelect.value;

    if (location) {
        const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${unit}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const locationText = document.getElementById('location-text');
                const temperatureText = document.getElementById('temperature-text');
                const descriptionText = document.getElementById('description-text');

                locationText.textContent = `Location: ${data.name}`;
                temperatureText.textContent = `Temperature: ${Math.round(data.main.temp)} ${unit === 'metric' ? 'C' : 'F'}`;
                descriptionText.textContent = `Description: ${data.weather[0].description}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
}
