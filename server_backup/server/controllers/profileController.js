const Profile = require('../models').Profile;

module.exports = {
  async show(req,res){
    try {
      const profileCollection = await  Profile.findAll({
        include: ['Bells'],
        order: [
          ['Bells', 'ringsAt']
        ]
      })

      res.status(201).send(profileCollection);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }

  },

  async add(req,res){
    try {
      console.log('creating profile: ', req.body);
      const newProfile = await db.Profile.create({ name: req.body.name })
      console.log("new profile Id: ", newProfile.id);
      
      req.body.Bells.forEach(bell => {
        Bell.create({ ringsAt: bell.ringsAt, profileId: newProfile.id })
          .then(newBell => {
            console.log("\tnew bell id: ", newBell.id);
        })
      });
        
      res.status(201).send(newProfile.id);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
  }
}