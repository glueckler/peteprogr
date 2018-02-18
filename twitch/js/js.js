var channelList = ['glydetv', 'theattack', 'aiekillu', 'emerycik', 'shraderdesigns', 'jayhobo', 'kaelijae', 'lovelustgames', 'mrdemonwolf', 'determin1st', 'ekojr', 'dankcuisine', 'food', 'konza27', 'christoxxrox', 'ryv3xs', 'adorisarts', 'imperialgrrl', 'savannahrose80', 'dexbrosworks', 'pokeranger69', 'juliakraty', 'gifyourselfahighfive', 'madeleineink', 'jonnykuik', 'sergeyfacecccp', 'hardrockangelart', 'pondelinp', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'music4studying', 'vigilantzee', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
var channels = []
var green = '#28c840'
var red = '#fe6158'

function Channel (name, logo, status, URL, desc) {
  this.name = name
  this.logo = logo
  this.status = status
  this.URL = URL
  this.description = desc
}

function twitchAPI (type, name) {
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?'
}

function channelPush () {
  channels.forEach(function (k) {
    console.log('hiii')
    if (k.status == 'online') var colorStatus = green
    else var colorStatus = red

    var htmlString = ' <li data-status="' + k.status + '"><div class="circle" style="border: solid ' + colorStatus + ' 2px">' +
	      ' <img src="' + k.logo + '" alt="profile picture"> ' +
	      ' <h2>' + k.name + '</h2> ' +
	      ' <p>' + k.description + '</p> ' +
	      ' <a href="' + k.URL + '" target="_blank">Channel Link</a> ' +
	      ' </div></li> '

    $('.stream-list').prepend(htmlString)
  })
}

function getChannelInfo () {
  var ctr = 0 // simulates callback to run channelPush()
  channelList.forEach(function (channel) {
    var gameName
    var status
    var URL
    var logo
    var channelName
    var description

    $.getJSON(twitchAPI('streams', channel), function (jsonData) {
      if (jsonData.stream === null) {
        gameName = 'Offline'
        status = 'offline'
      } else if (jsonData.stream === undefined) {
        gameName = 'Account Closed'
        status = 'offline'
      } else {
        gameName = jsonData.stream.game
        status = 'online'
      }

      $.getJSON(twitchAPI('channels', channel), function (json2) {
        logo = json2.logo != null ? json2.logo : 'img/missing.png'
        channelName = json2.display_name != null ? json2.display_name : channel
        description = status === 'online' ? json2.status : ''
        URL = json2.url

        var newChan = new Channel(channelName, logo, status, URL, description)
        channels.push(newChan)
        ctr++
        if (ctr === channelList.length) {
             	channelPush()
         	}
      })
    })
  })
  console.log(channels)
}

$(function () {
  getChannelInfo()

  $('#showAll, #showOnline').on('click', function () {
    if ($(this).is('#showOnline')) {
      $('.stream-list  li').fadeOut()
      $('[data-status="online"]').fadeIn()
    } else {
      $('[data-status="online"]').fadeOut()
      setTimeout(function () {
        $('.stream-list  li').fadeIn()
      }, 400)
    }
  })
})
