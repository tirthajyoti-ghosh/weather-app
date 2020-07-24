import "./styles/main.scss";

const weatherApp = (() => {
  var responseData = {};
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

  const getData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d00e1e258ffbc54d38829985755e490`);

    const json = await response.json();

    return json;
  };

  const toC = (temp) => { return parseInt(temp - 273.15); };

  const toF = (temp) => { return parseInt((temp - 273.15) * 9/5 + 32); };

  const retrieveAllTempNodes = () => {
    const temp = document.getElementById('temperature');
    const feelsLikeTemp = document.getElementById('feels-temp');
    const tempMin = document.getElementById('min-temp');
    const tempMax = document.getElementById('max-temp');

    return {
      temp,
      feelsLikeTemp,
      tempMin,
      tempMax,
    };
  };

  document.getElementById('convertToC').addEventListener('click', () => {
    const { temp, feelsLikeTemp, tempMin, tempMax } = retrieveAllTempNodes();

    if (temp.innerText === '--°') {
      return;
    }

    const {temperature, feelsTemp, minTemp, maxTemp} =  responseData;

    temp.innerText = `${toC(temperature)}°`;
    feelsLikeTemp.innerText = `${toC(feelsTemp)}°`;
    tempMin.innerText = `${toC(minTemp)}°`;
    tempMax.innerText = `${toC(maxTemp)}°`;

  });

  document.getElementById('convertToF').addEventListener('click', () => {
    const { temp, feelsLikeTemp, tempMin, tempMax } = retrieveAllTempNodes();

    if (temp.innerText === '--°') {
      return;
    }
    
    const {temperature, feelsTemp, minTemp, maxTemp} =  responseData;

    temp.innerText = `${toF(temperature)}°`;
    feelsLikeTemp.innerText = `${toF(feelsTemp)}°`;
    tempMin.innerText = `${toF(minTemp)}°`;
    tempMax.innerText = `${toF(maxTemp)}°`;

  });

  const displayData = () => {

    let {cityName, countryCode, description, icon, temperature, feelsTemp, minTemp, maxTemp, clouds, wind} =  responseData;

    const city = document.getElementById('city-name');
    const country = document.getElementById('country-code');
    const desc = document.getElementById('description');
    const image = document.getElementById('weather-image');

    const { temp, feelsLikeTemp, tempMin, tempMax } = retrieveAllTempNodes();

    const cloudiness = document.getElementById('clouds');
    const windSpeed = document.getElementById('wind');

    city.innerText = cityName;
    country.innerText = countryCode;
    desc.innerText = description;
    image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    temp.innerText = `${toC(temperature)}°`;
    feelsLikeTemp.innerText = `${toC(feelsTemp)}°`;
    tempMin.innerText = `${toC(minTemp)}°`;
    tempMax.innerText = `${toC(maxTemp)}°`;
    cloudiness.innerText = clouds;
    windSpeed.innerText = wind;
    
    console.log(responseData);
  };


  form.onsubmit = (e) => {
    e.preventDefault();

    const alert = document.querySelector('.alert');
    alert.classList.remove('show');

    const city = document.getElementById('city_input').value;  
    
    getData(city).then((response) => {
      responseData = parseData(response);    
      displayData();
      
    }).catch(() => {
      displayError();    
    });  
  };
})();


