const userRoute = require('./user');
const productRoute = require('./product');
const cartRoute = require('./cart');
const emailRoute = require('./email');
const historiesRoute = require('./history');
const chat = require('./chat');
const evaluateRoute = require('./evaluate');
const isAuth = require('../middleware/isAuth')

function route(app) {
    //client
    app.use('/email', isAuth.client, emailRoute);
    app.use('/users', userRoute);
    app.use('/products', productRoute);
    app.use('/carts', isAuth.client, cartRoute);
    app.use('/comment', evaluateRoute);
    app.use('/histories', isAuth.client, historiesRoute);
    //admin
    app.use('/chatrooms', chat)
}

module.exports = route;
