/* --------------------------------------------------------------------------
 * Name               : Fosti Webpage Project
 * File               : script.js
 * Version            : 1.0.0
 * Initial of Author  : Dzaki Fadhlurrohman
 * Contributor        : -
 * Author URI         : http://dzakifadh.github.io
 *
 * Fosti UMS. Copyright 2020. All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------

[Table of Contents]

1. Shuffle
2. Animation
3. Navbar Setting
4. Scroll to Top
5. Smooth Scroll to Top
-------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
1. Shuffle
-------------------------------------------------------------------------- */
var Shuffle = window.Shuffle
var myShuffle = new Shuffle(document.querySelector('.my-shuffle'), {
  itemSelector: '.image-item',
  sizer: '.my-sizer-element',
  buffer: 1,
})

window.jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
  var input = evt.currentTarget
  if (input.checked) {
    myShuffle.filter(input.value)
  }
})

/* --------------------------------------------------------------------------
2. Animation
-------------------------------------------------------------------------- */
$(document).ready(function () {
  AOS.init({
    duration: 1500,
    offset: -100,
    delay: 0,
    once: true,
  })
})

/* --------------------------------------------------------------------------
3. Navbar Setting
-------------------------------------------------------------------------- */
$(document).ready(function () {
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop()
    if (scroll < 80) {
      $('.navbar').removeClass('sticky-menu')
      $('.navbar').removeClass('solid')
    } else {
      $('.navbar').addClass('sticky-menu')
      $('.nav-link').addClass('nav-link-color')
    }
  })
  if ($('.navbar').height() < 100) {
    $('.navbar-toggler').click(function () {
      if ($(this).hasClass('collapsed')) {
        $('.navbar').addClass('solid')
      } else {
        $('.navbar').removeClass('solid')
      }
    })
  }
})

/* --------------------------------------------------------------------------
4. Scroll to Top
-------------------------------------------------------------------------- */
$(document).ready(function () {
  $('.scrollTo').click(function () {
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top - 120,
      },
      800
    )
    return false
  })
})

/* --------------------------------------------------------------------------
5. Smooth Scroll to Top
-------------------------------------------------------------------------- */
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.scrolltop:hidden').stop(true, true).fadeIn()
    } else {
      $('.scrolltop').stop(true, true).fadeOut()
    }
  })
  $(function () {
    $('.scroll').click(function () {
      $('html,body').animate(
        { scrollTop: $('#home').offset().top - 120 },
        '1000'
      )
      return false
    })
  })
})
