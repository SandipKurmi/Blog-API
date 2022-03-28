module.exports = (app) => {
    const controller = require('../controller/user.controller');

    app.post('/api/register', controller.register);
    app.post('/api/login', controller.login);
} 