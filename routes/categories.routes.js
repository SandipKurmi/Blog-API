module.exports = (app) => {
    const controller = require('../controller/category.controller');
    const auth = require('../middleware/auth')

    app.post('/category',auth, controller.create);
    app.get('/category',auth, controller.findAll);
    app.get('/category/:id',auth, controller.findOne);
    app.put('/category/:id',auth, controller.update);
    app.delete('/category/:id',auth, controller.delete);
} 