//Variáveis e seleções de elementos
const apikey = 'ce4c9a006db4d1778158939296b86c9c'


const cityInput = document.querySelector('#city-search-input')
const searchBtn = document.querySelector('.header-btn')

const currentDate = document.querySelector('.current-date')
const cityName = document.querySelector('.city-name')

const iconWeather = document.querySelector('.weather-icon')
const temperatureDescription = document.querySelector('.temperature-description')
const dinamicTemperature = document.querySelector('.dinamic-currente-temperature')


const windSeep = document.querySelector('#wind-speed')
const feelsTemperature = document.querySelector('#feels-like-temperature')
const currentHumidity = document.querySelector('#current-humidity')

const sunriseItem = document.querySelector('#sunrise-item')
const sunsetItem = document.querySelector('#sunset-item')


//Funções
// navigator.geolocation.getCurrentPosition((position) => {
//   let lat = position.coords.latitude
//   let lon = position.coords.longitude

//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}$units=metric&lang=pt_br&appid=${apikey}`)
//   .then((response)=> response.json())
//   .then((data) => displayWeather(data))

// }, (err) => {
//   if(err.code === 1) {
//     alert('Sua geolocalização foi negada. Busque manualmente por uma cidade a través da barra de pesquisa.')
//   }
// }

// )

function formatDate (epochTime){
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR', { month: 'long', day: 'numeric'})

  return `Hoje, ${formattedDate}`
}

function formatTime(epochTime){
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()

  return `${hours}:${minutes}`
}



const showWeatherCity = (city) => {

  iconWeather.src = `./assets/loading-icon.svg`

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apikey}`)
  .then((response)=> response.json())
  .then((data) => displayWeather(data))


}

function displayWeather (data) {
  let {
    dt, 
    name,
    weather: [{icon, description}],
    main: {temp, feels_like, humidity},
    wind: {speed},
    sys: {sunrise, sunset}
  } = data

  currentDate.textContent = formatDate(dt)
  cityName.textContent = name

  iconWeather.src = `./assets/${icon}.svg`

  temperatureDescription.textContent = description
  dinamicTemperature.textContent = `${Math.round(temp)}ºC`

  windSeep.textContent = `${Math.round(speed * 3.6)}km`
  feelsTemperature.textContent = `${Math.round(feels_like)}ºC`
  currentHumidity.textContent = `${humidity}%`

  sunriseItem.textContent = formatTime(sunrise)
  sunsetItem.textContent = formatTime(sunset)
}







//Eventos
searchBtn.addEventListener('click', (e) => {

  e.preventDefault()
  
  const city = cityInput.value

  showWeatherCity(city)
})


//