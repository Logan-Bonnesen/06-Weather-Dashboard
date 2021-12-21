
var cities = [];
var cityForm = $("#form-city");
var searchHistory = $("#search-history");
var currentWeather = $("#weather-now");
var days = $("#days");

$("#search-city").on("click", function () {
    var cityValue = $("#city-input").val();
    // localStorage.setItem(cityValue).val();
    console.log(cityValue)

mainWeatherSearch(cityValue);
}) 


function mainWeatherSearch(cityValue){
    var apiKey = "3a1c1e4103318a6fb52153cddbf9925a"
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityValue+"&appid="+apiKey+"&units=imperial"
    $.ajax({
        url: weatherURL,
        method:"GET"
    }).then(function(apiResponse){
    console.log(apiResponse);
    

    var name = $("<h2>").text(apiResponse.name + " " + moment().format("MMMM Do YYYY"));
    var temp = $("<p>").text("Temperature: " + apiResponse.main.temp);
    var card = $("<div>").addClass("card");
    var windSpeed = $("<p>").text("Wind: " + apiResponse.wind.speed);
    var humidity = $("<p>").text("Humidity: " + apiResponse.main.humidity);
    
    card.append(name, temp, windSpeed, humidity);
    currentWeather.append(card);
    


fiveDayForecast(apiResponse.coord.lat, apiResponse.coord.lon)


var fiveDayWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+apiResponse.coord.lat+"&lon="+apiResponse.coord.lon+"&appid="+apiKey+"&units=imperial"
    $.ajax({
        url: fiveDayWeatherURL,
        method: "GET"
        
    }).then(function(apiResponse){
        var uvi = $("<p>").text("UVI: " + apiResponse.daily[0].uvi)
        card.append(uvi)

    })


    })
}

function fiveDayForecast(lat, lon){
    var apiKey = "3a1c1e4103318a6fb52153cddbf9925a"
    var fiveDayWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=imperial"
    $.ajax({
        url: fiveDayWeatherURL,
        method: "GET"
        
    }).then(function(apiResponse) {
        console.log(apiResponse)

        for (var i = 0; i < apiResponse.daily.length-2; i++) {
            console.log(apiResponse.daily[i].temp.day)
            var temp = $("<p>").text("Temperature: " + apiResponse.daily[i].temp.day);
            var windSpeed = $("<p>").text("Wind: " + apiResponse.daily[i].wind_speed);
            var humidity = $("<p>").text("Humidity: " + apiResponse.daily[i].humidity);
            var card = $("<div>").addClass("card")
            card.append(temp, windSpeed, humidity)


            days.append(card);
        }        
    })


}