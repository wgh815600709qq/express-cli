// Sever Error Handler
function errorHandler(err, req, res, next) {
  res.status(500).send({ msg: err })
}
module.exports = errorHandler
