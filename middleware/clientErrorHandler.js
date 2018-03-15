function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    // Check request-headers contains `X-Requested-With` and value equals `XMLHttpRequest`
    res.status(500).send({ error: 'Server Error!' })
  } else {
    next(err)
  }
}

module.exports = clientErrorHandler