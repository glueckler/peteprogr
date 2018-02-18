// Variables
var city
var temp
var tempF
var cond
var fTime = 1000

// Functions
function convertToF (temp) {
  // this function will set the tempF variable
  tempF = parseInt(temp)
  tempF = tempF * (9 / 5) + 32
  tempF = tempF.toString()
  tempF = tempF + 'F'
}

function updateDOM (data, type) {
  var $handle = $('.' + type + '-data')
  var $handleDe = $('.' + type)
  $handle.append(data)
  function fader () {
    $handleDe.fadeOut(fTime, function () {
      $handle.fadeIn(fTime, function () {
        $handle.fadeOut(fTime, function () { $handleDe.fadeIn(fTime, fader) })
      })
    })
  };
  fader()
};

function displayIcon () {
  function addIcon (type) {
    $('.icon i').addClass('wi-day-' + type)
  };
  console.log(cond)
  switch (cond) {
    case 'Clouds':
      addIcon('cloudy')
      break
    case 'Rain':
      addIcon('rain')
      break
    case 'Drizzle':
      addIcon('rain')
      break
    case 'Snow':
      addIcon('snow')
      break
    case 'Clear':
      addIcon('sunny')
      break
    case 'Thunderstorm':
      addIcon('thunderstorm')
      break
    default:
      addIcon('sunny')
  }
};

function dimFuzz () {
  $('#over-fuzz').removeClass('hide')
};

function getWeather (city) {
  // this function will set all the weather variables and append html
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&+&appid=8d3baa5591bd8b076244d6a2b8fde415'
  $.getJSON(weatherAPI, function (weatherJSON) {
    temp = weatherJSON.main.temp
    convertToF(temp)
    temp += 'C'
    // and now the conditions
    cond = weatherJSON.weather[0]['main']
    console.log(city, temp, tempF, cond)
    // use updateDOM function to display the weather, type must match html class
    setTimeout(function () {
      updateDOM(city, 'location')
      updateDOM(temp, 'temp')
      updateDOM(cond, 'condit')
      displayIcon()
      dimFuzz()
    }, 2200)
  })
};

$(function () {
  // find the user's city
  $('.load-hide').addClass('hide')
  $.getJSON('http://ipinfo.io/json?', function (locationJSON) {
    var country = locationJSON.country
    city = locationJSON.city + ',' + country
    setTimeout(function () {
      $('.load-hide').removeClass('hide')
      $('.loading').addClass('hide')
      getWeather(city)
    }, 2600)
  })
})
