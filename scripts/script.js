var wkdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


const apiKey = "removeme"
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=svalbard`

const weatherImage = document.querySelector(".weather-img")

async function checkWeather(){
    /**
     * Take the weather for a given city using OpenWeather API.
     * @type {Response}
     */

    // Pull data
    const response = await fetch(apiURL + `&appid=${apiKey}`)
    var data = await response.json()

    console.log(data)

    // Change elements on website
    document.getElementById("location").innerHTML = data.name
    document.getElementById("current-weather-temp").innerHTML = `${Math.round(data.main.temp)}°C`
    document.getElementById("current-weather-cond").innerHTML = data.weather[0].main
    document.getElementById("humidity").innerHTML =`Humidity: ${data.main.humidity}%`
    document.getElementById("wind-speed").innerHTML =`Wind Speed: ${data.wind.speed}km/h`

    document.getElementById("clothing-specify").innerHTML = wearJacket(data.main.temp)


    // Change the icons based on the current weather
    if (data.weather[0].main == "Clouds"){
        weatherImage.src = "images/clouds.png"
    }else if (data.weather[0].main == "Clear"){
        weatherImage.src = "images/clear.png"
    }else if (data.weather[0].main == "Drizzle"){
        weatherImage.src = "images/drizzle.png"
    }else if (data.weather[0].main == "Rain"){
        weatherImage.src = "images/rain.png"
    }else if (data.weather[0].main == "Snow"){
        weatherImage.src = "images/snow.png"
    }else if (data.weather[0].main == "Mist"){
        weatherImage.src = "images/mist.png"
    } // End if

    // Remove later
    console.log(data)

} // async function checkWeather()


function wearJacket(currentTemp){


    switch (true){
        case currentTemp < -10:
            return  "Wear a big jacket today."
        case currentTemp >= -10 && currentTemp <= 5:
            return "Wear a somewhat big jacket today."
        case currentTemp >= 5 && currentTemp <= 15:
            return "Overcoat season. "
        case currentTemp >= 15 && currentTemp <= 25:
            return "Sweater weather. "
        case currentTemp > 25:
            return "Don't wear a jacket today."
    } // End switch



}



function updateDateTime(){
    /**
     * Pull the date, and show the current date and time.
     * @type {Date}
     */

    // Find the date
    let current_date = new Date()

    // Everything related to the date
    let weekday = current_date.getDay()
    let month = current_date.getMonth()
    let day = current_date.getDate()
    let year = current_date.getFullYear()

    // Everything related to time
    let hours = current_date.getHours()
    let minutes = current_date.getMinutes()
    let seconds = current_date.getSeconds()

    var date = document.getElementById('todays-date').innerHTML = `${wkdays[weekday]}, ${months[month]} ${day}, ${year}`
    var time = document.getElementById('current-time').innerHTML = `${hours}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`

} // function UpdateDateTime()



checkWeather()
updateDateTime()

setInterval(updateDateTime, 1000)