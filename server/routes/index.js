module.exports = app => {

    // Base URLS
    app.use('/api/books', require('./book.routes.js'))
    app.use('/api/users', require('./user.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
}