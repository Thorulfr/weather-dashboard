// BEGIN Function Declarations
function getWeather(cityName) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=922375a928fdc33c6466997d7ac7b917")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            $("#city-name").text(data[0].name)
            const date = new Date().toDateString();
            $("#date").text(date);            
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly&appid=922375a928fdc33c6466997d7ac7b917")
                .then(function(response) {
                    console.log("Third");
                    response.json().then(function(data) {
                        ;
                    });
                });
        })
        // })
};

// END Function Declarations

$("#form-submit").click(function(event) {
    event.preventDefault();
    var userSearch = $("#user-input").val();
    $("#user-input").val("");
    getWeather(userSearch);
});
