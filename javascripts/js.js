var currentAttr = 'Home'

function displayFader () {
  var clickedAttr = $(this).attr('data-proj-attr')
  if (clickedAttr == currentAttr) return
  $('.pages > div').fadeOut()
  $('#projDiv' + clickedAttr).fadeIn()
  currentAttr = clickedAttr
}

function menuBorder (liClicked) {
  $(liClicked).parent().siblings().children().css('border-bottom-color', 'rgba(0,0,0,.05')
  $(liClicked).css('border-bottom-color', 'black')
};

$(function () {
  $('.proj-menu span').on('click', displayFader).on('click', function () {
    var menuSelect = this
    menuBorder(menuSelect)
  })
})
