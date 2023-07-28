module.exports = app => {
    const contacts = require("../controllers/phone.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", contacts.create);
  
    router.get("/", contacts.findAll);
  
    router.get("/:phoneId", contacts.findOne);
  
    router.put("/:phoneId", contacts.update);
  
    router.delete("/:phoneId", contacts.delete);
  
    app.use('/api/contacts/:contactId/phones', router);
};