var wordLength
var app1 = angular.module('app1', [])
var wikAPI = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='
var cb = '&callback=JSON_CALLBACK'
var page = 'https://en.wikipedia.org/?curid='

var srText = $('.full-screen')
var input = $('.s-input')

function shrinkText () {
  console.log('here')
  srText.css('font-size', '27px')
}

function scrollResults () {
  var offset = -20 // Offset of 20px
  $('html, body').animate({ scrollTop: $('.articles').offset().top + offset}, 600)
}

app1.controller('ctrl1', function ($scope, $http) {
  $scope.search = 'type'
  $scope.results = []

  $scope.findWiki = function () {
    shrinkText()
    $scope.results = []

    var srch = input.val()
    if (srch !== '' && typeof srch !== 'undefined') {
      $http.jsonp(wikAPI + srch + cb)
        .success(function (data) {
          var results = data.query.pages
          angular.forEach(results, function (value, key) {
            $scope.results.push({
              title: value.title,
              body: value.extract,
              page: page + value.pageid
            })
          })
        })
    };

    scrollResults()
  }

  $scope.upWordLength = function () {
    setTimeout(function () {
      wordLength = $scope.search
      var count = wordLength.length
      var winHeight = $(window).height()
      if (typeof count !== 'undefined' && count !== 0) {
        var textSize = ((winHeight * 0.75) / (count - (count / 1.5)))
        if (textSize > (winHeight * 0.75)) textSize = (winHeight * 0.75)
        srText.animate({fontSize: textSize + 'px' }, 100)
      }
    }, 20)
  }
})

$(function () {
  input.select()
  $('body').on('click', function () {
    console.log('here')
    input.select()
  })
})
