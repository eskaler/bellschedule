const Day = require('../models').Day;

module.exports = {
  async show(req,res){
    try {
      const days = await  Day.findAll({});
      res.status(201).send(days);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
  },

  async update(req,res){
    try {
      req.body.forEach(day => {
        Day.update({ profileId: day.profileId }, {
          where: {
            id: day.id
          }
        }).then(() => {
          console.log("Done");
        });
      });
      res.status(201).send("done");
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
  }
}
