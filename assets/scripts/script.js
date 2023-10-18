// To do:

// Add function to use textinput value to make an API call to grab weather instanceof

// Add function that updates html elements with API Response

// Add function that saves and renders search inputs to the history container

// Add function for when a user clicks on a history item it updates data to that city

$(function () {

const forecast = "https://api.openweathermap.org/data/2.5/forecast?units=imperial";
const weather = "https://api.openweathermap.org/data/2.5/weather?units=imperial";
const apiKey = "c4677e246eb6585329412dc66d55ff47";

var cityInput = "chicago";

async function updateWeather(){
    const response = await fetch(weather + `&appid=${apiKey}` + `&q=${cityInput}`)
    var data = await response.json();

    $("#currentCity").html(data.name);
    $("#currentTemp").html(data.main.temp + "&deg;");
    $("#currentWind").html("Wind: " + data.wind.speed + " MPH");
    $("#currentHumidity").html("Humidity: " + data.main.humidity + "%");
}

async function updateForecast(){
    const response = await fetch(forecast + `&appid=${apiKey}` + `&q=${cityInput}`)
    var data = await response.json();

    console.log(data.list[4].dt_txt);
    $("#day1").children(".forecastDay").html(data.list[4].dt_txt)
}

$("#searchButton").click(function(){
    cityInput = $("#userSearch").val();
    console.log(cityInput);

    updateWeather();
    updateForecast();
})

});

