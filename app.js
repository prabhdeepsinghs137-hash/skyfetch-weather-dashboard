// ===============================
// Configuration
// ===============================

// ⚠️ IMPORTANT: Replace with your actual API key
const API_KEY = 'YOUR_ACTUAL_API_KEY';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const DEFAULT_CITY = 'London';

// ===============================
// Fetch Weather Data
// ===============================

async function getWeather(city) {
    // Prevent empty city search
    if (!city || city.trim() === '') {
        showError('Please enter a city name.');
        return;
    }

    const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    // Show loading state
    document.getElementById('weather-display').innerHTML =
        '<p class="loading">Loading weather data...</p>';

    try {
        const response = await axios.get(url);
        displayWeather(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error);

        if (error.response && error.response.status === 404) {
            showError('City not found. Please check the spelling.');
        } else {
            showError('Unable to fetch weather data. Try again later.');
        }
    }
}

// ===============================
// Display Weather Data
// ===============================

function displayWeather(data) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
            <div class="extra-info">
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
        </div>
    `;

    document.getElementById('weather-display').innerHTML = weatherHTML;
}

// ===============================
// Error Display Helper
// ===============================

function showError(message) {
    document.getElementById('weather-display').innerHTML =
        `<p class="error">${message}</p>`;
}

// ===============================
// Optional: Search Button Support
// ===============================

function searchWeather() {
    const cityInput = document.getElementById('city-input').value;
    getWeather(cityInput);
}

// ===============================
// Load Default City on Page Load
// ===============================

document.addEventListener('DOMContentLoaded', function () {
    getWeather(DEFAULT_CITY);
});
