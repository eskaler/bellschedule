const Setting = require('../models').Setting;

module.exports = {
  async show(req,res){
    try {
      const settings = await  Setting.findAll({});
      console.log(settings);
      res.status(201).send(settings);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
  },

  async updateAll(req,res){
    try {
      req.body.forEach(setting => {
        Setting.update({ value: setting.value }, {
          where: {
            field: setting.field
          }
        }).then(() => {
          console.log("Done");
        });
      });
      res.status(201);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
  }
}
