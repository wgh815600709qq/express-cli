/*
  Router-interceptor Middleware
*/
function Interceptor (req, res, next) {
  if (process.env.NODE_ENV === 'dev') { // Beautify the api request logger for better debugger
    console.log('**********************')
    console.log('Request_Path', req.path)
    console.log('Request_Mehtod', req.method)
    console.log('**********************')
    console.log('                      ')
  }
  // deal with req.path
  next()
}

module.exports = Interceptor
