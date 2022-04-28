const { check, validationResult } = require('express-validator');
const Bonds = require('../models/bond.model');
const Clients = require('../models/client.model');

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Failed",
                errors: errors.array()
            })
        }

        const { clientId, name, details, type, image } = req.body;

        let cl = await Clients.findOne({_id: clientId});

        if(!cl) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Client not found"
            })
        }

        const newBond = new Bonds({
            clientId: clientId, 
            name: name, 
            details: details, 
            type: type,
            image: image ? image : "",
            released: false
        })

        await newBond.save();

        res.status(201).send({
            success: true,
            data: newBond,
            message: "Bond Created"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        let bonds = await Bonds.find({});

        res.status(200).send({
            success: true,
            data: bonds,
            message: "All Bonds"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getSingle = async (req, res) => {
    try {
        const id = req.params.id;

        let bond = await Bonds.findOne({_id: id});

        if(!bond) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Bond not found"
            })
        }

        res.status(200).send({
            success: true,
            data: bond,
            message: "Bond found"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.update = async (req, res) => {
    try {
        
        const id = req.params.id;

        let bond = await Bonds.findOne({_id: id});

        if(!bond) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Bond not found"
            })
        }

        const { name, details, type, released } = req.body;

        let updated = await Bonds.findOneAndUpdate({_id: id}, {
            name: name, 
            details: details, 
            type: type, 
            released: released
        }, { new: true })

        res.status(200).send({
            success: true,
            data: updated,
            message: "Bond Updated"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.validate = (method) => {
    switch (method) {
        case "create": {
            return [
                check('clientId', 'client id is required!').exists(),
                check('name', 'name is required!').exists(),
                check('details', 'details is required!').exists(),
                check('type', 'type is required!').exists()
            ]
        }
    }
}