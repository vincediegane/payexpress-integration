const dotenv = require('dotenv')
dotenv.config()
function SHA256Encrypt(password) {
  let crypto = require('crypto');
  let sha256 = crypto.createHash('sha256');
  sha256.update(password);
  return sha256.digest('hex');
}

module.exports = function (request, response) {
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