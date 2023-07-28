module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", contacts.create);
  
    router.get("/", contacts.findAll);
  
    router.get("/:contactId", contacts.findOne);
  
    router.put("/:contactId", contacts.update);
  
    router.delete("/:contactId", contacts.delete);
  
    app.use('/api/contacts', router);
};