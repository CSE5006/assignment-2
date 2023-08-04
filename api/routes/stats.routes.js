module.exports = app => {
    const stats = require("../controllers/stats.controller.js");
  
    var router = require("express").Router();
  
    router.get("/stats", stats.calculate);
  
    app.use('/api', router);
};