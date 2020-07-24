import "./styles/main.scss";

const form = document.getElementById('form');

const displayError = () => {
  const alert = document.querySelector('.alert');
  alert.classList.add('show');
};

const parseData = (response) => {

  return {
    cityName: response.name,
    countryCode: response.sys.country,
    description: response.weather[0].description,
    icon: response.weather[0].icon,
    temperature: response.main.temp,
    feelsTemp: response.main.feels_like,
    minTemp: response.main.temp_min,
    maxTemp: response.main.temp_max,
    clouds: response.clouds.all,
    wind: response.wind.speed,
  };
};

form.onsubmit = (e) => {
  e.preventDefault();

  const alert = document.querySelector('.alert');
  alert.classList.remove('show');

  const city = document.getElementById('city_input').value;  
  
  getData(city).then((response) => {
    const data = parseData(response);    
    displayData(data);
  }).catch(() => {
    displayError();    
  });  
};

const getData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d00e1e258ffbc54d38829985755e490`);

  const json = await response.json();

  return json;
};

const toC = (temp) => { parseFloat(temp) - 273.15; };

const toF = (temp) => { (parseFloat(temp) - 273.15) * 9/5 + 32; };


const displayData = (data) => {

  let {cityName, countryCode, description, icon, temperature, feelsTemp, minTemp, maxTemp, clouds, wind} =  data;

  const city = document.getElementById('city-name');
  const country = document.getElementById('country-code');
  const desc = document.getElementById('description');
  const image = document.getElementById('weather-image');
  const temp = document.getElementById('temperature');
  const feelsLikeTemp = document.getElementById('feels-temp');
  const tempMin = document.getElementById('min-temp');
  const tempMax = document.getElementById('max-temp');
  const cloudiness = document.getElementById('clouds');
  const windSpeed = document.getElementById('wind');

  city.innerText = cityName;
  country.innerText = countryCode;
  desc.innerText = description;
  image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  temp.innerText = `${temperature}°`;
  feelsLikeTemp.innerText = `${feelsTemp}°`;
  tempMin.innerText = `${minTemp}°`;
  tempMax.innerText = `${maxTemp}°`;
  cloudiness.innerText = clouds;
  windSpeed.innerText = wind;

};
