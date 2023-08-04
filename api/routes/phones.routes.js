module.exports = app => {
    const phones = require("../controllers/phone.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:contactId/phones", phones.create);
  
    router.get("/contacts/:contactId/phones", phones.findAll);
  
    router.get("/contacts/:contactId/phones/:phoneId", phones.findOne);
  
    router.put("/contacts/:contactId/phones/:phoneId", phones.update);
  
    router.delete("/contacts/:contactId/phones/:phoneId", phones.delete);
  
    app.use('/api', router);
};