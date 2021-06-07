const routes = require('express')();

//registers our authentication routes with Express.
routes.use('/user', require('./controllers/user'));

module.exports = routes;
