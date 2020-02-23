const axios = require('axios')
module.exports = function (request, response, next) {
  axios({
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    url: 'https://payexpresse.com/api/payment/request-payment',
    data: {
      "item_name": "",
      "item_price": "",
      "ref_command": "",
      "command_name": "",
      // optional
      "currency": "",
      "env": "",
      "ipn_url": "",
      "success_url": "",
      "cancel_url": "",
      "custom_field": "",
    }
  })
    .then(axioResponse => {
      // Your backend logic
      response.json({
        data: axioResponse.data
      })
    })
}