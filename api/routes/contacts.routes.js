module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/", contacts.create);
  
    router.get("/contacts/", contacts.findAll);
  
    router.get("/contacts/:contactId", contacts.findOne);
  
    router.put("/contacts/:contactId", contacts.update);
  
    router.delete("/contacts/:contactId", contacts.delete);
  
    app.use('/api', router);
};