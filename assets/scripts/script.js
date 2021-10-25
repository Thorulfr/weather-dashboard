// Alias Luxon for easier use
var DateTime = luxon.DateTime;

// Variable declarations
var today = DateTime.now();
var savedSearches = [];

// Get and display weather
function getWeather(cityName) {
    // Get coordinates using searched-for city
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=922375a928fdc33c6466997d7ac7b917")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Display city name and save to recent searches
            $("#city-name").text(data[0].name);
            saveSearch(data[0].name);
            loadSearches();
            // Display current date
            $("#date").text(today.toLocaleString(DateTime.DATE_HUGE)); 
            // Get weather using coordinates generated above
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly&units=metric&appid=922375a928fdc33c6466997d7ac7b917")
                .then(function(response) {
                    response.json().then(function(data) {
                        // Give user an answer
                        if (data.current.weather[0].id < 800) {
                            $("#answer").text("Hell no.");
                        } else {
                            $("#answer").text("Yup.");
                        }
                        // Populate current weather data
                        $("#current-icon").html("<img src='http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png'>");
                        $("#current-temp").text("Temperature: " + data.current.temp + " °C");
                        $("#current-wind").text("Wind Speed: " + data.current.wind_speed + "m/s");
                        $("#current-humidity").text("Humidity: " + data.current.humidity + "%");
                        $("#current-uv").text(data.current.uvi);
                        // Color-code UV Index
                        if (data.current.uvi < 2) {
                            $("#current-uv").addClass("is-primary");
                        } else if (data.current.uvi < 7) {
                            $("#current-uv").addClass("is-warning");
                        } else {
                            $("#current-uv").addClass("is-danger");
                        };
                        // Populate future weather data
                        for (let i = 1; i < 6; i++) {                            
                            $("#date-" + i).text(today.plus({days: i}).toLocaleString(DateTime.DATE_HUGE));
                            $("#icon-" + i).html("<img src='http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png'>")
                            $("#temp-" + i).text("Temp: " + data.daily[i].temp.day + " °C");
                            $("#wind-" + i).text("Wind: " + data.daily[i].wind_speed + "m/s");
                            $("#humi-" + i).text("Humidity: " + data.daily[i].humidity + "%");
                        }
                    });
                });
        })
};

// Save searches to local storage
function saveSearch(city) {
    savedSearches.push(city);
    if (savedSearches.length > 5) {
        savedSearches.shift();
    }
    localStorage.setItem("searches", JSON.stringify(savedSearches));
}

// Load searches from local storage
function loadSearches() {
    savedSearches = JSON.parse(localStorage.getItem("searches"));
    if (!savedSearches) {
        savedSearches = [];
    };
    if (savedSearches.length == 0) {
        return;
    } else {
        $("#recent-searches").empty();
        for (let i = 0; i < savedSearches.length; i++) {
            $("#recent-searches").append("<button class='button is-danger is-light is-flex m-2'>" + savedSearches[i] + "</button>");
        };
    };
}

// BEGIN Listeners
$("#form-submit").click(function(event) {
    event.preventDefault();
    var userSearch = $("#user-input").val();
    $("#user-input").val("");
    getWeather(userSearch);
    $("#weather-details").removeClass("is-hidden");
    $("#answer").removeClass("is-hidden");
});

getWeather("Salt Lake City");
$("#weather-details").removeClass("is-hidden");
loadSearches();