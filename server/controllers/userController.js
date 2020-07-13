const User = require('../models').User;

module.exports = {
  async login(req,res){
    try {
      const loggedId = await User.findOne({
        attributes: ['id'],
        where: {
          login: req.body.login,
          password: req.body.password
        }
      });
    
      console.log('loggedId:', loggedId);
      loggedId == null ? res.status(401) : res.status(200).send(loggedId);     

    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }

  }
}