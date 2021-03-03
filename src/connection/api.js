import $ from 'jquery'

// const APIENDPOINT = 'http://localhost:8000/api/'
const APIENDPOINT = 'https://api-arene.menopi.ch/api/'
// const APIENDPOINT = 'http://api.menopi.ch/'

function getProducts () {
  return $.ajax({
    url: APIENDPOINT + 'products',
    method: 'GET'
  })
}

function getProductsFilter (tcg) {
  var research
  if (tcg == null) { research = 'products' } else { research = 'products?trading_card_game_id=' + tcg }
  return $.ajax({
    url: APIENDPOINT + research,
    method: 'GET'
  })
}

function getProduct (id) {
  return $.ajax({
    url: APIENDPOINT + 'products/' + id,
    method: 'GET'
  })
}

function getEvents () {
  return $.ajax({
    url: APIENDPOINT + 'events',
    method: 'GET'
  })
}

function getEvent (id) {
  return $.ajax({
    url: APIENDPOINT + 'events/' + id,
    method: 'GET'
  })
}

function deleteEvent (id) {
  return $.ajax({
    url: APIENDPOINT + 'events/' + id,
    method: 'DELETE'
  })
}

function getCategories () {
  return $.ajax({
    url: APIENDPOINT + 'categories',
    method: 'GET'
  })
}

function getTcgames () {
  return $.ajax({
    url: APIENDPOINT + 'tcgames',
    method: 'GET'
  })
}

function getLanguages () {
  return $.ajax({
    url: APIENDPOINT + 'languages',
    method: 'GET'
  })
}

function registerUser (user) {
  return $.ajax({
    url: APIENDPOINT + 'register',
    method: 'POST',
    data: {
      name: user.name,
      email: user.email,
      password: user.password
    }
  })
}

function addOrder (products) {
  return $.ajax({
    url: APIENDPOINT + 'orders',
    method: 'POST',
    data: {
      buys: products
    }
  })
}

export default {
  getProducts,
  getProductsFilter,
  getProduct,
  getEvents,
  getEvent,
  deleteEvent,
  getCategories,
  getTcgames,
  getLanguages,
  registerUser,
  addOrder
}
