const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const contact = {
        name: req.body.name
    };

    Contacts.create(contact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the contact."
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId;
    Contacts.findByPk(id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({message: err.message}))
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId;
    Contacts.update(req.body, {
        where: {id:id},
    })
    .then((num) => {
        if (num === 1) res.send({message: "contact was updated successfully"})
        else res.send ({message:'cannot update contact with id=%{id}.'})
    })
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.contactId;
    Contacts.destroy({
        where: {id:id},
    })
    .then((num) => {
        if (num === 1) res.send({message: "contact was deleted successfully"})
        else res.send ({message:'cannot delete contact with id=%{id}.'})
    })
    .catch((err) => res.status(500).send({message: err.message }));
};
