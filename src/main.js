const form = document.getElementById('form');

form.onsubmit = (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;

  displayData(city);
  
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



const displayData = (city) => {
  const data = document.getElementById('data');
  data.innerHTML = "";

  const image = createElement('img');
  const weather = createElement('p');
  const weatherDesc = createElement('p');
  const temp = createElement('p');
  const feelTemp = createElement('p');
  const minTemp = createElement('p');
  const maxTemp = createElement('p');
  const clouds = createElement('p');

  getData(city).then((json) => {
    image.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
    data.appendChild(image);

    weather.innerText = `Weather: ${json.weather[0].main}`;
    data.appendChild(weather);
    
    weatherDesc.innerText = `Description: ${json.weather[0].description}`;
    data.appendChild(weatherDesc);

    temp.innerText = `Temperature: ${json.main.temp}`;
    data.appendChild(temp);

    feelTemp.innerText = `Feels like: ${json.main.feels_like}`;
    data.appendChild(feelTemp);

    minTemp.innerText = `Min temap.: ${json.main.temp_min}`;
    data.appendChild(minTemp);

    maxTemp.innerText = `Max temp.: ${json.main.temp_max}`;
    data.appendChild(maxTemp);

    clouds.innerText = `Clouds: ${json.clouds.all}%`;
    data.appendChild(clouds);
  }).catch(error => {
    console.log(error);    
  });


};
