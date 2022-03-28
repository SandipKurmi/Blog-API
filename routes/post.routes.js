module.exports = (app) => {
    const controller = require('../controller/post.controller');
    const auth = require('../middleware/auth');

    app.post('/post',auth, controller.create);
    app.get('/post',auth, controller.findAll);
    app.get('/post/:id',auth, controller.findOne);
    app.put('/post/:id',auth, controller.update);
    app.delete('/post/:id',auth, controller.delete);
} 