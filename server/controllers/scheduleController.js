const Profile = require('../models').Profile;
const Day = require('../models').Day;
const Setting = require('../models').Setting;
var axios = require('axios');

// const Profile = require('../models').Schedule;

module.exports = {
  async sendToEsp(req,res){
    try {


      //building message
      const profiles = await Profile.findAll({
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
          date.getMonth()+1,
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
            profileBells.push(parseInt(hrmin[0]), parseInt(hrmin[1]));
          });
          profileBells.unshift(profileBells.length+2);
          espRequest.profiles.push(profileBells);
        });     
      const bellDuration = await Setting.findOne({
        where: {
          field: "bell_duration"
        }
      });
      espRequest.bellDuration = bellDuration.value*1;
      //end of Building message

      //sending request
      const ipesp = await Setting.findOne({
        where: {
          field: "esp_ip"
        }
      });
      console.log(espRequest);
      console.log(`http://${ipesp.value}:80/schedule`)
      axios.post(`http://${ipesp.value}:80/schedule`, espRequest).then(response=>{
          console.log(response);
        }
      );
      res.status(200).send("something went wrong");
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
  },

 
}





function buildEspMessage(){
  
  return espRequest;
}