// Alias Luxon for easier use
var DateTime = luxon.DateTime;

// Variable declarations
var today = DateTime.now();

// Get and display weather
function getWeather(cityName) {
    // Get coordinates using searched-for city
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=922375a928fdc33c6466997d7ac7b917")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Display city name
            $("#city-name").text(data[0].name);
            // Display current date
            $("#date").text(today.toLocaleString(DateTime.DATE_HUGE)); 
            // Get weather using coordinates generated above
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly&units=metric&appid=922375a928fdc33c6466997d7ac7b917")
                .then(function(response) {
                    response.json().then(function(data) {
                        // Populate current weather data
                        $("#current-icon").html("<img src='http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png'>");
                        $("#current-temp").text("Temperature: " + data.current.temp + " °C");
                        $("#current-wind").text("Wind Speed: " + data.current.wind_speed + "m/s");
                        $("#current-humidity").text("Humidity: " + data.current.humidity + "%");
                        $("#current-uv").text("UV Index: " + data.current.uvi);
                        // Populate future weather data
                        for (let i = 1; i < 6; i++) {                            
                            $("#date-" + [i]).text(today.plus({days: [i]}).toLocaleString(DateTime.DATE_HUGE));
                            $("#icon-" + [i]).html("<img src='http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png'>")
                            $("#temp-" + [i]).text("Temperature: " + data.daily[i].temp.day + " °C");
                            $("#wind-" + [i]).text("Wind Speed: " + data.daily[i].wind_speed + "m/s");
                            $("#humi-" + [i]).text("Humidity: " + data.daily[i].humidity + "%");
                        }
                    });
                });
        })
};

// BEGIN Listeners
$("#form-submit").click(function(event) {
    event.preventDefault();
    var userSearch = $("#user-input").val();
    $("#user-input").val("");
    // getWeather("userSearch");
    getWeather("Salt Lake City");
});
