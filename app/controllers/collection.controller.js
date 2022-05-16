const Collection = require("../models/collection.model");
const { check, validationResult } = require('express-validator');
const loanModel = require("../models/loan.model");
const dayjs = require("dayjs");
const userModel = require("../models/user.model");

exports.create = async (req, res) => {
    try {
        const user = req.user;

        if(user.userType.toLowerCase() != "collector") {
            return res.status(401).send({
                success: false,
                message: "Need a collectors token...",
                errors: ["Invalid Token"]
            });
        }

        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Failed",
                errors: errors.array()
            })
        }

        const {loanId, date, amount} = req.body;

        let loan = await loanModel.findOne({_id: loanId});

        loan.remainingAmount = loan.remainingAmount - amount;

        loan.save();

        let col = new Collection({
            collectorId: user.id,
            loanId: loanId,
            date: date,
            amount: amount
        });

        await col.save();

        res.status(201).send({
            success: true,
            data: col,
            message: "Collection Created"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getbyDateRange = async (req, res) => {
    try {
        const {start, end} = req.body;

        let data = await Collection.find({});

        let range = data.filter(i => {
            if(dayjs(i.date).format("YYYY-MM-DD") >= dayjs(start).format("YYYY-MM-DD") && dayjs(i.date).format("YYYY-MM-DD") <= dayjs(end).format("YYYY-MM-DD")) {
                return true;
            }  
            else {
                return false;
            }
        })

        res.status(200).send({
            success: true,
            data: range,
            message: "Collections found"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.deleteCollection = async (req, res) => {
    try {
        const id = req.params.id;

        let col = await Collection.findOne({_id: id});

        let loan = await loanModel.findOne({_id: col.loanId});

        loan.remainingAmount = loan.remainingAmount + col.amount;

        await loan.save();

        let del = await Collection.findOneAndDelete({_id: id});

        res.status(200).send({
            success: true,
            data: del,
            message: "Collection Deleted"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getByLoanid = async (req, res) => {
    try {
        const id = req.params.id;

        let cols = await Collection.find({loanId: id});

        res.status(200).send({
            success: true,
            data: cols,
            message: "Collections for loan"
        })
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
        let all = await Collection.find({});

        res.status(200).send({
            success: true,
            data: all,
            message: "All collections"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;

        let col = await Collection.findOne({_id: id});

        res.status(200).send({
            success: true,
            data: col,
            message: "Collection details"
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
                check('loanId', 'loan id is required!').exists(),
                check('date', 'date is required!').exists(),
                check('amount', 'amount is required!').exists(),
            ]
        }
    }
}