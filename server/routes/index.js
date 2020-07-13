//index.js
const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');
const scheduleController = require('../controllers/scheduleController');
const dayController = require('../controllers/dayController');
const settingController = require('../controllers/settingController');

module.exports = (app) => {

    app.get('/api',(req,res) => {
        res.status(200).send({
            data : "Welcome Node Sequlize API v1"
        })
    })

    app.get('/api/profiles/', profileController.show);
    app.post('/api/profiles/', profileController.add);

    app.get('/api/schedule/esp', scheduleController.sendToEsp);

    app.post('/api/login/', userController.login);

    app.get('/api/days/', dayController.show);
    app.post('/api/days/', dayController.update);
    
    app.get('/api/settings/', settingController.show);
    app.patch('/api/settings/', settingController.updateAll);

    // app.get('/api/users',userController.getAllUsers);
    // app.post('/api/user/create',userController.create);
    // app.put('/api/user/:userId',userController.update);
    // app.get('/api/:userId/posts',postController.getAllPostsOfUser);
    // app.post('/api/post/create',postController.createPost);
    // app.put('/api/:postId',postController.update);

}