const { check, validationResult } = require('express-validator');
const bondModel = require('../models/bond.model');
const clientModel = require('../models/client.model');
const collectionModel = require('../models/collection.model');
const Loans = require('../models/loan.model');

exports.createLoan = async (req, res) => {
    try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Failed",
                errors: errors.array()
            })
        }

        const {
            type,
            date,
            dueDate,
            amount,
            instalmentAmount,
            numberOfInstalments,
            interestRate,
            bondId,
            fullAmount,
            clientId
        } = req.body;

        const newLoan = new Loans({
            type: type,
            date: date,
            dueDate: dueDate,
            amount: amount,
            instalmentAmount: instalmentAmount,
            numberOfInstalments: numberOfInstalments,
            interestRate: interestRate,
            fullAmount: fullAmount,
            remainingAmount: fullAmount,
            paid: false,
            bondId: bondId,
            clientId: clientId
        });

        await newLoan.save();

        res.status(201).send({
            success: true,
            data: newLoan,
            message: "Loan Created"
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
        let loans = await Loans.find({});

        res.status(200).send({
            success: true,
            data: loans,
            message: "All Loans"
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

        let loan = await Loans.findOne({_id: id});

        if(!loan) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Loan not found"
            })
        }

        let collections = await collectionModel.find({loanId: id});
        let client = await clientModel.findOne({_id: loan?.clientId});

        let bond = null;
        if(loan.bondId != "") {
            bond = await bondModel.findOne({_id: loan?.bondId});
        }

        res.status(200).send({
            success: true,
            data: { 
                loan: loan,
                client: client,
                bond: bond,
                collections: collections
            },
            message: "Loan found"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.updateLoan = async (req, res) => {
    try {
        const id = req.params.id;

        let loan = await Loans.findOne({_id: id});

        if(!loan) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Loan not found"
            })
        }

        const {
            type, date, dueDate, instalmentAmount, numberOfInstalments, interestRate, paid, bondId, clientId
        } = req.body;

        let updated = await Loans.findOneAndUpdate({_id: id}, {
            type: type, 
            date: date, 
            dueDate: dueDate, 
            instalmentAmount: instalmentAmount, 
            numberOfInstalments: numberOfInstalments, 
            interestRate: interestRate, 
            paid: paid, 
            bondId: bondId, 
            clientId: clientId
        }, { new: true })

        res.status(200).send({
            success: true,
            data: updated,
            message: "Loan Updated"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.deleteLoan = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.loanDetailsForCustomer = async (req, res) => {
    try {
        const {email, nic} = req.body;

        let client = await clientModel.findOne({email: email, nic: nic});

        if(!client) {
            return res.status(404).send({
                success: false,
                data: null,
                message: "Client not found"
            })
        }

        let loans = await Loans.find({clientId: client._id});

        let loanDetails = [];
        for (let i = 0; i < loans.length; i++) {
            let collections = await collectionModel.find({loanId: loans[i]?._id});
            // loans[i].collections = collections;
            loanDetails.push({
                loan: loans[i],
                collections: collections
            })
        }

        return res.status(200).send({
            success: true,
            data: loanDetails,
            message: "Loan Details Found!"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.findLoansByClientId = async (req, res) => {
    try {
        const id = req.params.id;

        let loan = await Loans.find({clientId: id});

        res.status(200).send({
            success: true,
            data: loan,
            message: "Loans for client"
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
                check('type', 'type is required!').exists(),
                check('date', 'date is required!').exists(),
                check('dueDate', 'dueDate is required!').exists(),
                check('interestRate', 'interestRate is required!').exists(),
            ]
        }
    }
}