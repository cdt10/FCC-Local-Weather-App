var lat = 0;
var lon = 0;
var city = "";
var country = "";
var state = "";
var temp = 0;
var tempc = 0;
var tempf = 0;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyDmh5lYW9GbghGsyHEpvS8hwofcuAhhXRg", function(result) {
      city = result.results[0].address_components[3].long_name;
      state = result.results[0].address_components[5].long_name;
      country = result.results[0].address_components[6].short_name;
      //console.log(city);
      $(".city-country").html(city + ", " + state + ", " + country);
      //console.log(country);

      $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=7406865f0c4a97492246e84ddfc3f79c", function(json) {
        //console.log(json);
        
        //display city name
        //console.log(json.name);
        
        //display weather description
        //console.log(json.weather[0].main);
        $(".weather").html(json.weather[0].main);
        
        //display weather description
        //console.log(json.weather[0].description);
        
        //display temperature
        //console.log(json.main.temp);
        temp = json.main.temp;
        temp = Math.floor(temp * 9 / 5 - 459.67);
        tempf = temp;
        
        $(".temp").html(tempf + "<i class= 'wi wi-fahrenheit'></i>");
        
        $(".celsius").on("click", function() {
            tempc = Math.floor((temp - 32) * 5 / 9);
            $(".temp").html(tempc + "<i class= 'wi wi-celsius'></i>");
        });
        
        $(".fahrenheit").on("click", function() {
          tempf = Math.floor(tempc * 9 / 5 + 32);
          $(".temp").html(tempf + "<i class= 'wi wi-fahrenheit'></i>");
        });
        
      });
    });

  });
}
