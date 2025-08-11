
const API_KEY = 'YOUR_API_KEY_HERE'; 
const searchBtn = document.getElementById('searchBtn');
const locBtn = document.getElementById('locBtn');
const cityInput = document.getElementById('cityInput');
const result = document.getElementById('result');
const placeEl = document.getElementById('place');
const descEl = document.getElementById('desc');
const tempEl = document.getElementById('temp');
const feelsEl = document.getElementById('feels');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const timeEl = document.getElementById('time');
const timeEl = document.getElementById('date');
function showError(msg)
{
  placeEl.textContent = 'Error';
  descEl.textContent = msg;
  tempEl.textContent = '--';
  result.classList.remove('hidden');
}
async function fetchWeather(query)
{
  try 
  {
    const url = https:https://hgtyyughjhlj;ok{API_KEY};
    const res = await fetch(url);
    if (!res.ok)
        {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch');
    }
    const data = await res.json();
    updateUI(data);
  }
   catch (err)
    {
    showError(err.message || 'Something went wrong');
  }
}
function updateUI(data)
{
  const name = ${data.name}${data.sys && data.sys.country ? ', ' + data.sys.country : ''};
  const desc = data.weather && data.weather[0] ? data.weather[0].description : 'N/A';
  placeEl.textContent = name;
  descEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
  tempEl.textContent = Math.round(data.main.temp);
  feelsEl.textContent = Math.round(data.main.feels_like);
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = (data.wind.speed || 0).toFixed(1);
  const now = new Date();
  timeEl.textContent = Updated: ${now.toLocaleString()};
  result.classList.remove('hidden');
}

searchBtn.addEventListener('click', ()=>
    {
  const city = cityInput.value.trim();
  if (!city) return showError('Please enter a city name');
  fetchWeather(q=${
    encodeURIComponent(city)
});
});

cityInput.addEventListener('keydown', (e)=>
    {
  if (e.key === 'Enter') searchBtn.click();
});

locBtn.addEventListener('click', ()=>
    {
  if (!navigator.geolocation) return showError('Geolocation not supported');
  navigator.geolocation.getCurrentPosition(pos=>
    {
    const {latitude, longitude} = pos.coords;
    fetchWeather(lat=${latitude}&lon=${longitude});
  }, err=>
    {
    showError('Location access denied or unavailable');
  }, {
    timeout:10000
});
});

