const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    console.log("Creating phone with data:", req.body);  // Added for debugging

    const phone = {
        name: req.body.name,
        number: req.body.number,
        contactId: req.body.contactId
    };

    Phones.create(phone)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the phone."
            });
        });
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving phones."
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
    const id = req.params.phoneId;

    Phones.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({message: "Not found phone with id " + id});
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error retrieving phone with id " + id});
        });
};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.phoneId;

    Phones.update(req.body, { where: {id: id} })
        .then(num => {
            if (num == 1) {
                res.send({message: "Phone was updated successfully."});
            } else {
                res.send({message: `Cannot update phone with id=${id}. Maybe phone was not found or req.body is empty!`});
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error updating phone with id " + id});
        });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.phoneId;

    Phones.destroy({ where: {id: id} })
        .then(num => {
            if (num == 1) {
                res.send({message: "Phone was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete phone with id=${id}. Maybe phone was not found!`});
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Could not delete phone with id " + id});
        });
};
