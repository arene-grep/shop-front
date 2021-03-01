import $ from 'jquery'

// const APIENDPOINT = 'http://localhost:8000/api/'
const APIENDPOINT = 'https://api-arene.menopi.ch/api/'

function getProducts () {
  return $.ajax({
    url: APIENDPOINT + 'products',
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

function loginUser (user) {
  return $.ajax({
    url: APIENDPOINT + 'login',
    method: 'POST',
    data: {
      email: user.email,
      password: user.password
    }
  })
}

export default {
  getProducts,
  getProduct,
  getEvents,
  getEvent,
  deleteEvent,
  getCategories,
  getTcgames,
  getLanguages,
  registerUser,
  loginUser
}
