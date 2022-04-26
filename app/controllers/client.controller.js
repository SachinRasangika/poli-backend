const Client = require("../models/client.model");
const { check, validationResult } = require('express-validator');

exports.createClient = async (req, res) => {
    try {

        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Failed",
                errors: errors.array()
            })
        }

        const { fullName, email, address, nic, phone, job, workplace } = req.body;

        const newClinet = new Client({
            fullName, email, address, nic, phone, job, workplace
        })

        await newClinet.save();

        res.status(201).send({
            success: true,
            data: newClinet,
            message: "Client Created"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getAllClients = async (req, res) => {
    try {
        let clients = await Client.find({});

        res.status(200).send({
            success: true,
            data: clients,
            message: "All Clients"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getSingleClient = async (req, res) => {
    try {
        const id = req.params.id;

        let client = await Client.findOne({_id: id});
        
        if(!client) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Client not found"
            })
        }

        res.status(200).send({
            success: true,
            data: client,
            message: "Client found"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.updateClient = async (req, res) => {
    try {
        const id = req.params.id;

        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Failed",
                errors: errors.array()
            })
        }

        let cl = await Client.findOne({_id: id});

        if(!cl) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Client not found"
            })
        }

        const { fullName, email, address, nic, phone, job, workplace } = req.body;

        let updated = await Client.findOneAndUpdate({_id: id}, {
            fullName, 
            email, 
            address, 
            nic, 
            phone, 
            job, 
            workplace
        }, { new: true });

        res.status(200).send({
            success: true,
            data: updated,
            message: "Client updated"
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
                check('fullName', 'Full Name is required!').exists(),
                check('email', 'Email is required!').exists().isEmail(),
                check('address', 'address is required!').exists(),
                check('nic', 'nic is required!').exists(),
                check('phone', 'phone is required!').exists(),
                check('job', 'job is required').exists(),
                check('workplace', 'workplace is required').exists(),
            ]
        }
    }
}
