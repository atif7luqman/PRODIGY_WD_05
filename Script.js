const API_KEY = 'd8dc8bb35a3ef4cd3e67120d51657a18'; // Replace with your actual API key

let weatherData = null;
let city = 'Sukkur'; // Default city

const fetchWeatherData = async () => {
  try {
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (currentWeatherResponse.ok && forecastResponse.ok) {
      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();
      weatherData = {
        current: currentWeatherData,
        forecast: forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5), // Show 5 days forecast
      };
      renderWeatherData();
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

const renderWeatherData = () => {
    const weatherContainer = document.querySelector('.weather-data');
    weatherContainer.innerHTML = `
      <h1>Weather App</h1>
      <div class="city-selector">
        <label for="city">Select City:</label>
        <select id="city" onchange="updateCity(this.value)">
          <option value="Sukkur">Sukkur</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Faisalabad">Faisalabad</option>
          <option value="Rawalpindi">Rawalpindi</option>
          <option value="Multan">Multan</option>
          <option value="Gujranwala">Gujranwala</option>
          <option value="Peshawar">Peshawar</option>
          <option value="Quetta">Quetta</option>
          <option value="Sialkot">Sialkot</option>
          <option value="Bahawalpur">Bahawalpur</option>
          <option value="Sargodha">Sargodha</option>
          <option value="Sahiwal">Sahiwal</option>
          <option value="Mirpur Khas">Mirpur Khas</option>
          <option value="Okara">Okara</option>
          <option value="Rahim Yar Khan">Rahim Yar Khan</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Larkana">Larkana</option>
          <option value="Nawabshah">Nawabshah</option>
          <option value="Mirpur Bathoro">Mirpur Bathoro</option>
          <option value="Shikarpur">Shikarpur</option>
          <option value="Jacobabad">Jacobabad</option>
          <option value="Dadu">Dadu</option>
          <option value="Badin">Badin</option>
          <option value="Tando Adam">Tando Adam</option>
          <option value="Khairpur">Khairpur</option>
          <option value="Umerkot">Umerkot</option>
          <option value="Mithi">Mithi</option>
          <option value="Kotri">Kotri</option>
          <option value="Ghotki">Ghotki</option>
          <option value="Naushahro Firoz">Naushahro Firoz</option>
          <option value="Jamshoro">Jamshoro</option>

          <!-- Add more cities from different countries -->
        </select>
      </div>
    `
    weatherData && weatherData.current ? renderWeatherInfo(weatherData) : '';
  };



const renderWeatherInfo = () => {
  const weatherContainer = document.querySelector('.weather-info');
  weatherContainer.innerHTML = `
    <h2>${weatherData.current.name}</h2>
    <p>Temperature: ${weatherData.current.main.temp}°C</p>
    <p>Weather: ${weatherData.current.weather[0].description}</p>
  `;
  renderForecastData();
};

const renderForecastData = () => {
  const forecastContainer = document.querySelector('.forecast');
  forecastContainer.innerHTML = `
    <h1>5-Day Forecast</h1>
    <div class="forecast-list">
      ${weatherData.forecast.map((item, index) => renderForecastItem(item, index)).join('')}
    </div>
  `;
};

const renderForecastItem = (item, index) => {
  const date = new Date(item.dt * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `
    <div class="forecast-item">
      <p>${month}/${day}/${year}</p>
      <p>Temperature: ${item.main.temp}°C</p>
      <p>Weather: ${item.weather[0].description}</p>
    </div>
  `;
};

const updateCity = (selectedCity) => {
    city = selectedCity;
    document.getElementById('city').value = selectedCity;
    fetchWeatherData();
  };

fetchWeatherData();