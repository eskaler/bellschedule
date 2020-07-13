const Profile = require('../models').Profile;
const Day = require('../models').Day;

// const Profile = require('../models').Schedule;

module.exports = {
  async forEsp(req,res){
    try {
      const profiles = await  Profile.findAll({
        include: ['Bells'],
        order: [
          ['Bells', 'ringsAt']
        ]
      });

      const days = await Day.findAll({});

      var date = new Date;
      let espRequest = {
        date: [
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getDate(),
          date.getMonth(),
          date.getFullYear()
          ],
        profiles: [],
        schedule: []
  
      }
      let profileIds = [];


      days.forEach(day => {
        let insertingId = -1;
        if(day.profileId != null){
          insertingId = day.profileId;
        };
        if(profileIds.indexOf(insertingId) == -1 && insertingId != -1){
          profileIds.push(insertingId);
        }
        if(insertingId == -1)
          espRequest.schedule.push(-1);
        else
          espRequest.schedule.push(profileIds.indexOf(insertingId));
      });
      console.log(profileIds);
      let vs = espRequest.schedule[espRequest.schedule.length-1];
      espRequest.schedule.unshift(vs);
      espRequest.schedule.splice(espRequest.schedule.length-1, 1);
      espRequest.profiles.push([profileIds.length+1]);
        profileIds.forEach(profileId => {
          let profile = null;
          profiles.forEach(prof => {
            if(prof.id == profileId){
              profile = prof;
            }
          });
        
          let profileBells = [];
          profile.Bells.forEach(bell => {
            let hrmin = bell.ringsAt.split(":");
            //console.log("hrmin: ", hrmin);
            profileBells.push(parseInt(hrmin[0]), parseInt(hrmin[1]));
          });
          profileBells.unshift(profileBells.length+2);
          console.log("profileBells", profileBells);
          espRequest.profiles.push(profileBells);
        });
  
      console.log("espRequest");
      console.log(espRequest);
      res.status(200).send(espRequest);
      // axios.post("htpp://192.168.43.182/schedule", espRequest);


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

