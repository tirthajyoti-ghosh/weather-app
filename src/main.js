const form = document.getElementById('form');

const displayError = (error) => {
  const data = document.getElementById('data');
  data.innerHTML = 'City not found';
};

form.onsubmit = (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;
  
  getData(city).then((response) => {
    displayData(response);
  }).catch((err) => {
    displayError(err);    
  });  
};

const getData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d00e1e258ffbc54d38829985755e490`);

  const json = await response.json();

  return json;
};

const createElement = (tag, classes='', text='') => {
  const element = document.createElement(tag);
  element.setAttribute('class', classes);
  element.innerText = text;

  return element;
};

const displayData = (data) => {

  const {name, weather: [{main, description, icon}], main: {temp, feels_like, temp_min, temp_max}, clouds: {all}} =  data;

  const displayData = document.getElementById('data');
  displayData.innerHTML = "";

  const cityName = createElement('h2', '', `City: ${name}`);
  const image = createElement('img');
  const weather = createElement('p', '', `Weather: ${main}`);
  const weatherDesc = createElement('p', '', `Description: ${description}`);
  const temperature = createElement('p', '', `Temperature: ${temp}`);
  const feelTemp = createElement('p', '', `Feels like: ${feels_like}`);
  const minTemp = createElement('p', '', `Min temp.: ${temp_min}`);
  const maxTemp = createElement('p', '', `Max temp.: ${temp_max}`);
  const clouds = createElement('p', '', `Clouds: ${all}%`);

  displayData.appendChild(cityName);

  image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  displayData.appendChild(image);

  displayData.appendChild(weather);
  
  displayData.appendChild(weatherDesc);

  displayData.appendChild(temperature);

  displayData.appendChild(feelTemp);

  displayData.appendChild(minTemp);

  displayData.appendChild(maxTemp);

  displayData.appendChild(clouds);

};