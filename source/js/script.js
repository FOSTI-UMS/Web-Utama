/* --------------------------------------------------------------------------
 * Name               : Fosti Webpage Project
 * File               : script.js
 * Version            : 2.0.0
 * Initial of Author  : Dzaki Fadhlurrohman
 * Contributor        : -
 * Author URI         : http://dzakifadh.github.io
 *
 * Fosti UMS. Copyright 2022. All Rights Reserved.
 * -------------------------------------------------------------------------- */

import { endpoints } from './constant/event-endpoints.js'

// This function are called when the page is loaded
document.addEventListener("DOMContentLoaded", main)

/**
 * Main function of the script
 */
async function main() {
  // initGallery()
  initAOS()
  initNavbar()
  initButtonScrollToTopPage()
  renderLatestEvent()
}

/**
 * Initialize shuffle library to shuffle the gallery images
 */
function initGallery() {
  const Shuffle = window.Shuffle
  const myShuffle = new Shuffle(document.querySelector('.my-shuffle'), {
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
}

/**
 * Initialize AOS library to display animation movement
 */
function initAOS() {
  AOS.init({
    duration: 1500,
    offset: -100,
    delay: 0,
    once: true,
  })
}

/**
 * Initialize navbar setting
 */
function initNavbar() {
  // Event listener for displaying navbar with sticky position when scroll
  $(window).on('scroll', function () {
    const scroll = $(window).scrollTop()
    if (scroll < 40) {
      $('.navbar').removeClass('sticky-menu')
      $('.navbar').removeClass('solid')

      if (!$('.navbar-toggler').hasClass('collapsed')) {
        $('.navbar').addClass('solid')
      }
    } else {
      $('.navbar').addClass('sticky-menu')
      $('.nav-link').addClass('nav-link-color')
    }
  })

  // Event listener for displaying navbar with solid color when it not collapsed (for mobile device)
  if ($('.navbar').height() < 100) {
    $('.navbar-toggler').click(function () {
      if ($(this).hasClass('collapsed')) {
        $('.navbar').addClass('solid')
      } else {
        $('.navbar').removeClass('solid')
      }
    })
  }

  // Event listener to scroll on content when sub menu clicked
  $('.scrollTo').click(function () {
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top - 120,
      },
      800
    )
    return false
  })
}

/**
 * Initialize button to scroll to top page
 */
function initButtonScrollToTopPage() {
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
}

/**
 * Get the latest event data from official Fosti event API
 * @returns
 */
async function getLatestEvent() {
  const response = await fetch(endpoints.getLatestEvent.url)
  const events = await response.json()

  if (events.length > 0) {
    return events[0]
  }

  return {}
}

/**
 * Render the latest event data to the page
 */
async function renderLatestEvent() {
  const eventContainer = document.querySelector('#event')
  const eventTitle = eventContainer.querySelector('.title')
  const eventDescription = eventContainer.querySelector('.description')
  const eventDate = eventContainer.querySelector('.date span')
  const eventTime = eventContainer.querySelector('.time span')
  const eventPlace = eventContainer.querySelector('.place span')
  const eventPhamplet = eventContainer.querySelector('.phamplet')
  const joinEventLink = eventContainer.querySelector('.show-event')

  try {
    eventTitle.innerText = 'Loading'
    eventDescription.innerText = 'Loading ...'
    eventDate.innerText = 'Loading ...'
    eventTime.innerText = 'Loading ...'
    eventPlace.innerText = 'Loading ...'
    eventPhamplet.src = 'source/images/loading-phamplet.png'

    const latestEvent = await getLatestEvent()
    const latestEventDate = new Date(latestEvent.penutupan)

    eventTitle.innerText = latestEvent.nama_event
    eventDescription.innerText = latestEvent.deskripsi
    eventDate.innerText = eventDateBuilder(latestEventDate)
    eventTime.innerText = eventTimeBuilder(latestEventDate)
    eventPlace.innerText = latestEvent.tempat
    eventPhamplet.src = endpoints.getPamphlet.url(latestEvent.pamflet)
    joinEventLink.href = endpoints.joinEvent.url(latestEvent.slug)
  } catch (e) {
    eventTitle.innerText = 'Maaf, sepertinya kami tidak dapat memuat data event terakhir 😭'
    eventDescription.innerText = 'Silahkan coba refresh halaman ini !'
    eventDate.innerText = '-'
    eventTime.innerText = '-'
    eventPlace.innerText = '-'
    eventPhamplet.src = 'source/images/failed-phamplet.png'
  }
}

/**
 * Build date text for event
 * @param {Date} eventDate
 * @returns
 */
function eventDateBuilder(eventDate) {
  const date = eventDate.getDate()
  const month = eventDate.getMonth() + 1
  const year = eventDate.getFullYear()

  return `${date}-${(month < 10) ? '0' + month : month}-${year}`
}

/**
 * Build hour time for event date
 * @param {Date} eventDate
 * @returns
 */
function eventTimeBuilder(eventDate) {
  const hour = eventDate.getHours()
  const minutes = eventDate.getMinutes()

  return `${(hour < 10) ? '0' + hour : hour}.${(minutes < 10) ? '0' + minutes : minutes} WIB`
}