/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=eab8048c2fcac4c4454be69c13e8b5bf&units=metric';
// Event listener to add function to existing HTML DOM element
const button = document.querySelector('#generate');
// console.log(button);
button.addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e) {
  //   console.log('clicked');
  const zipCode = document.querySelector('#zip').value + ',';
  const feelings = document.querySelector('#feelings').value;

  validateZip(feelings);

  getWeather(baseURL, zipCode, apiKey).then((data) => {
    // console.log(data);
    // console.log(data.weather[0].main);
    postData('/addData', {
      date: newDate,
      temp: data.main.temp,
      content: feelings,
    });

    updateUI();
  });
}

/* Function to GET Web API Data*/

const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    // console.log(data.main);
    return data;
  } catch (err) {
    console.log('ERROR: ', err.message);
  }
};

/* Function to POST data */

const postData = async (url = '', data = {}) => {
  // console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (err) {
    console.log('ERROR: ', err);
  }
};

/* Function to GET Project Data */

const updateUI = async () => {
  const req = await fetch('/allData');
  try {
    const data = await req.json();
    console.log(data);
    document.querySelector('#date').innerHTML = `Date: ${data.date}`;
    document.querySelector('#temp').innerHTML = `Temp: ${data.temp}`;
    document.querySelector('#content').innerHTML = `Feelings: ${data.content}`;
  } catch (err) {
    console.log('ERROR', err);
  }
};

function validateZip(el) {
  if (!el.value) return alert('zip field is empty');
}
