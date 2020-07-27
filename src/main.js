import './styles/main.scss';

const weatherApp = () => {
  let responseData = {};
  const form = document.getElementById('form');

  const displayError = () => {
    const alert = document.querySelector('.alert');
    alert.classList.add('show');
  };

  const getData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d00e1e258ffbc54d38829985755e490`);

    const json = await response.json();

    return json;
  };

  const toC = (temp) => parseInt((temp - 273.15), 10);

  const toF = (temp) => parseInt(((temp - 273.15) * (9 / 5) + 32), 10);

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

  const retrieveAllTempResponse = () => {
    const {
      main: { temp: temperature },
      main: { feels_like: feelsTemp },
      main: { temp_min: minTemp },
      main: { temp_max: maxTemp },
    } = responseData;

    return {
      temperature,
      feelsTemp,
      minTemp,
      maxTemp,
    };
  };

  const updateAllTemp = (temperature, feelsTemp, minTemp, maxTemp) => {
    const {
      temp, feelsLikeTemp, tempMin, tempMax,
    } = retrieveAllTempNodes();

    temp.innerText = `${temperature}°`;
    feelsLikeTemp.innerText = `${feelsTemp}°`;
    tempMin.innerText = `${minTemp}°`;
    tempMax.innerText = `${maxTemp}°`;
  };

  document.getElementById('convertToC').addEventListener('click', () => {
    const { temp } = retrieveAllTempNodes();

    if (temp.innerText === '--°') {
      return;
    }

    const {
      temperature,
      feelsTemp,
      minTemp,
      maxTemp,
    } = retrieveAllTempResponse();

    updateAllTemp(toC(temperature), toC(feelsTemp), toC(minTemp), toC(maxTemp));
  });

  document.getElementById('convertToF').addEventListener('click', () => {
    const { temp } = retrieveAllTempNodes();

    if (temp.innerText === '--°') {
      return;
    }

    const {
      temperature,
      feelsTemp,
      minTemp,
      maxTemp,
    } = retrieveAllTempResponse();

    updateAllTemp(toF(temperature), toF(feelsTemp), toF(minTemp), toF(maxTemp));
  });

  const displayData = () => {
    const {
      name: cityName,
      sys: { country: countryCode },
      weather: [{ description }],
      weather: [{ icon }],
      clouds: { all: clouds },
      wind: { speed: wind },
    } = responseData;

    const {
      temperature,
      feelsTemp,
      minTemp,
      maxTemp,
    } = retrieveAllTempResponse();

    const city = document.getElementById('city-name');
    const country = document.getElementById('country-code');
    const desc = document.getElementById('description');
    const image = document.getElementById('weather-image');
    const cloudiness = document.getElementById('clouds');
    const windSpeed = document.getElementById('wind');

    city.innerText = cityName;
    country.innerText = countryCode;
    desc.innerText = description;
    image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    updateAllTemp(toC(temperature), toC(feelsTemp), toC(minTemp), toC(maxTemp));

    cloudiness.innerText = clouds;
    windSpeed.innerText = wind;
  };


  form.onsubmit = (e) => {
    e.preventDefault();

    const alert = document.querySelector('.alert');
    alert.classList.remove('show');

    const city = document.getElementById('city_input').value;

    getData(city).then((response) => {
      responseData = response;
      displayData();
    }).catch(() => {
      displayError();
    });
  };
};

weatherApp();
