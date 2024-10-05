const apiKey = 'apikey';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locat = document.getElementById('loc')
const description = document.getElementById('Wdesc')
const temperature = document.getElementById('temper')
const locationInput = document.getElementById('LocInp')
const buttons = document.getElementById('button')
/*const unit = document.getElementById('temp')*/
const image = document.getElementById('img')

buttons.addEventListener('click', function () {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});


function fetchWeather(location) {

    function CheckUnit() {
        const select = getElementById('temp');
        const selected = select.value;
        if (selected === 'F') {
            const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=imperial`;
        } else if (selected === 'C') {
            const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
        }
        return url
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locat.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}`;
            description.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}