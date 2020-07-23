const form = document.getElementById('form');

form.onsubmit = (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;

  console.log(city);
  
};
