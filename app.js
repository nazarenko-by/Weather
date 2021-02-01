//weather class
class Weather {
    constructor(dayOfWeek, weatherImg, description, tempMax, tempMin, tempNow, feelsLike, cloudiness, windSpeed, windDeg, pressure) {
        this.domRefs = {
            dayOfWeek,
            weatherImg,
            description,
            tempMax,
            tempMin,
            tempNow,
            feelsLike,
            cloudiness,
            windSpeed,
            windDeg,
            pressure
        }
    }
    render() {
        let weatherForm = document.querySelector(".weather-form");
        weatherForm.innerHTML = `
            <div class="col-xs-12 col-md-7">
                <div class="day-of-week">${this.domRefs.dayOfWeek}</div>
                <div class="info">
                    <div class="image">
                        <img src=http://openweathermap.org/img/wn/${this.domRefs.weatherImg}@2x.png alt="">
                        <div class="description">${this.domRefs.description}</div>
                    </div>
                <div class="temp-info">
                    <div class="max-min-temp">
                        <div class="temp-max">Max: ${this.domRefs.tempMax} °C</div>
                        <div class="temp-min">Min: ${this.domRefs.tempMax} °C</div>
                    </div>
                    <div class="temp-now">${this.domRefs.tempNow} °C</div>
                    <div class="feels-like">Feels like: ${this.domRefs.feelsLike} °C</div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-5 details">
            <div class="cloudiness">
                <img src="images/clouds.png" alt="">
                <div class="detales-info">${this.domRefs.cloudiness}%</div>
            </div>
            <div class="wind">
                <img src="images/wind.png" alt="">
                <div class="detales-info">${this.domRefs.windSpeed} m/s  ${this.domRefs.windDeg}</div>
            </div>
            <div class="pressure">
                <img src="images/pressure.png" alt="">
                <div class="detales-info">${this.domRefs.pressure} mbar</div> 
            </div>
        </div>
        `
    }

}

// button active
let citys = document.querySelector(".selectors");
let city = document.getElementById("cityId");
let showButton = document.querySelector(".button");
citys.addEventListener("click", function () {
    toggleButton(city);
})

function toggleButton(city) {
    if (city.options[city.selectedIndex].value !== null && city.options[city.selectedIndex].value !== "") {

        showButton.disabled = false;
        showButton.classList.remove("disable")
    } else {
        showButton.disabled = true;
        showButton.classList.add("disable")
    }
}

toggleButton(city);

//weather show
let weatherBlock = document.querySelector(".weather");


function openWeather() {
    weatherBlock.classList.add("show");
    weatherBlock.classList.remove("hide");
    getWeatherData()
}

function closeWeather() {
    weatherBlock.classList.add("hide");
    weatherBlock.classList.remove("show");
}

showButton.addEventListener("click", openWeather);

weatherBlock.addEventListener("click", function (e) {
    if (e.target == weatherBlock) {
        closeWeather();
    }
})

//get weather
function getWeatherData() {
    console.log(city.options[city.selectedIndex].value)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.options[city.selectedIndex].value}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
        .then(response => response.json())
        .then(data => (
            new Weather(
                getDayOfWeek(data.dt),
                data.weather[0].icon,
                data.weather[0].main,
                data.main.temp_max,
                data.main.temp_min,
                Math.round(data.main.temp),
                Math.round(data.main.feels_like),
                data.clouds.all,
                data.wind.speed,
                windDirection(data.wind.deg),
                data.main.pressure
            ).render()
        ))
}

function getDayOfWeek(date) {
    let newDate = new Date(date);
    let day = newDate.getDay();
    switch (day) {
        case 1:
            return "Monday"

        case 2:
            return "Tuesday"

        case 3:
            return "Wednesday"

        case 4:
            return "Thersday"

        case 5:
            return "Friday"

        case 6:
            return "Saturday"

        case 8:
            return "Sunday"
    }
}

function windDirection(deg) {
    if (337 <= deg && deg < 360 || 0 <= deg && deg < 23) {
        return "N"
    } else if (23 <= deg && deg < 68) {
        return "NE"
    } else if (68 <= deg && deg < 113) {
        return "E"
    } else if (113 <= deg && deg < 158) {
        return "SE"
    } else if (158 <= deg && deg < 203) {
        return "S"
    } else if (203 <= deg && deg < 248) {
        return "SW"
    } else if (248 <= deg && deg < 293) {
        return "W"
    } else {
        return "NW"
    }
}