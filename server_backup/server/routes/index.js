//index.js
const profileController = require('../controllers/profileController');
const userController = require('../controllers/userController');
const scheduleController = require('../controllers/scheduleController');
// const postController = require('../controller').post;
module.exports = (app) => {

    app.get('/api',(req,res) => {
        res.status(200).send({
            data : "Welcome Node Sequlize API v1"
        })
    })

    app.get('/api/profiles/', profileController.show);
    app.get('/api/schedule/esp', scheduleController.forEsp);
    app.post('/api/login/', userController.login);

    // app.get('/api/users',userController.getAllUsers);
    // app.post('/api/user/create',userController.create);
    // app.put('/api/user/:userId',userController.update);
    // app.get('/api/:userId/posts',postController.getAllPostsOfUser);
    // app.post('/api/post/create',postController.createPost);
    // app.put('/api/:postId',postController.update);

}