const {API_KEY, API_SECRET} = process.env
const axios = require('axios')
const express = require('express')

function ask (request, response, next) {
  // const data = {
  //   "item_name": "",
  //   "item_price": "",
  //   "ref_command": "",
  //   "command_name": "",
  //   // optional
  //   "currency": "",
  //   "env": "test|prod",
  //   "ipn_url": "",
  //   "success_url": "",
  //   "cancel_url": "",
  //   "custom_field": "",
  // }
  const data = Object.assign({}, {
    env: 'test',
    currency: 'XOF',
    // ipn_url: 'https://7cdde587.ngrok.io/ipn ',
    // success_url: 'https://7cdde587.ngrok.io/callback?type=success',
    // cancel_url: 'https://7cdde587.ngrok.io/callback?type=error',
  }, request.body)
  console.log({data})
  axios({
    headers: {
      'content-type': 'application/json',
      API_KEY,
      API_SECRET
    },
    method: 'POST',
    url: 'https://payexpresse.com/api/payment/request-payment',
    data
  })
    .then(axioResponse => {
      // Your backend logic
      response.json({
        data: axioResponse.data
      })
    })
    .catch(error => {
      const data = error.response && error.response.data ? error.response.data : error
      response.json({
        type: 'error',
        data
      })
    })
}

function callback (request, response, next) {
  response.json({
    type: request.query.type  
  })
}

function ipn (request, response) {
  const {type_event,
    ref_command,
    item_name,
    item_price,
    devise,
    command_name,
    env,
    token,
    api_key_sha256,
    api_secret_sha256} = request.body
  const custom_field = JSON.parse(request.body.custom_field);

  const {API_KEY, API_SECRET} = process.env

  if(SHA256Encrypt(my_api_secret) !== api_secret_sha256 
    || SHA256Encrypt(my_api_key) !== api_key_sha256) {
    return response.status(400)
      .json({
        type: 'error',
        message: 'This is not from PayExpress',
        data: request.body
      })
  }
  return response.status(200)
    .json({
      type: 'success',
      message: 'This is not from PayExpress',
      data: request.body
    })
}

module.exports = express.Router()
  .post('/ipn', ipn)
  .post('/ask', ask)
  .get('/callback', callback)