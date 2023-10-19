// To do:

// Add function to use textinput value to make an API call to grab weather instanceof

// Add function that updates html elements with API Response

// Add function that saves and renders search inputs to the history container

// Add function for when a user clicks on a history item it updates data to that city

$(function () {

const forecastEndpoint = "https://api.openweathermap.org/data/2.5/forecast?units=imperial";
const weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?units=imperial";
const apiKey = "c4677e246eb6585329412dc66d55ff47";

var cityInput = "Madison";

async function updateWeather(){
    const response = await fetch(weatherEndpoint + `&appid=${apiKey}` + `&q=${cityInput}`)
    var data = await response.json();
    var weather = data.weather[0].main

    $("#currentCity").html(data.name);
    $("#currentTemp").html(data.main.temp + "&deg;");
    $("#currentWind").html("Wind: " + data.wind.speed + " MPH");
    $("#currentHumidity").html("Humidity: " + data.main.humidity + "%");

    if (weather == "Clouds"){
        $("#currentCity").append(` <i class="fa-solid fa-cloud"></i>`);
    } else if (weather == "Clear"){
        $("#currentCity").append(` <i class="fa-solid fa-sun"></i>`);
    } else if (weather == "Rain"){
        $("#currentCity").append(` <i class="fa-solid fa-umbrella"></i>`);
    } else {
        $("#currentCity").append(` <i class="fa-solid fa-circle-question"></i>`);
    }
}

async function updateForecast(){
    const response = await fetch(forecastEndpoint + `&appid=${apiKey}` + `&q=${cityInput}`)
    var data = await response.json();
    var i = 0;

    //Updates each forecast block with relevant values
    $(".forecastBlock").each(function(){
        //converts dt_txt into desired format
        var date = dayjs(data.list[i].dt_txt).format("ddd M/D");
        var temp = `${Math.round(data.list[i].main.temp)}°`;
        var wind = `W: ${Math.round(data.list[i].wind.speed)}MPH`;
        var humidity = `H: ${Math.round(data.list[i].main.humidity)}%`;

        var tempEl = $(this).children(".columns").children(".column").children(".forecastTemp")
        var windEl = $(this).children(".columns").children(".column").children(".forecastWind")
        var humidityEl = $(this).children(".columns").children(".column").children(".forecastHumidity")

        var weather = data.list[i].weather[0].main;

        //updates html elements based on array items for given city
        $(this).children(".forecastDay").html(date);
        tempEl.text(temp);
        windEl.text(wind);
        humidityEl.text(humidity);

        if (weather == "Clouds"){
            tempEl.append(` <i class="fa-solid fa-cloud"></i>`);
        } else if (weather == "Clear"){
            tempEl.append(` <i class="fa-solid fa-sun"></i>`);
        } else if (weather == "Rain"){
            tempEl.append(` <i class="fa-solid fa-umbrella"></i>`);
        } else {
            tempEl.append(` <i class="fa-solid fa-circle-question"></i>`);
        }
        console.log(weather);
        i = i + 8;
    });

    i = 0;
}

$("#searchButton").click(function(){
    cityInput = $("#userSearch").val();
    console.log(cityInput);

    updateWeather();
    updateForecast();
})

updateWeather();
updateForecast();

});

