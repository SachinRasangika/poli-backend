const Employee = require('../models/employee.model');
const userModel = require('../models/user.model');

exports.create = async (req, res) => {
    try {

        const {
            fullName,
            address,
            nic,
            phone,
            email,
            position,
            department,
            additionalInfo,
            userId
        } = req.body;

        const newEmp = await new Employee({
            fullName: fullName,
            address: address,
            nic: nic,
            phone: phone,
            email: email,
            position: position,
            department: department,
            additionalInfo: additionalInfo,
            userId: userId ? userId : ""
        })

        await newEmp.save();

        res.status(201).send({
            success: true,
            data: newEmp,
            message: "Employee Created"
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
        let emps = await Employee.find({});

        res.status(200).send({
            success: true,
            data: emps,
            message: "All Employees"
        });

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

        let emp = await Employee.findOne({_id: id});

        if(!emp) {
            res.status(404).send({
                success: false,
                data: null,
                message: "Employee not found"
            })
        }

        res.status(200).send({
            success: true,
            data: emp,
            message: "Employee found"
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

        const {
            fullName,
            address,
            nic,
            phone,
            email,
            position,
            department,
            additionalInfo,
            userId
        } = req.body;

        let updated = await Employee.findOneAndUpdate({_id: id}, {
            fullName: fullName,
            address: address,
            nic: nic,
            phone: phone,
            email: email,
            position: position,
            department: department,
            additionalInfo: additionalInfo,
            userId: userId ? userId : ""
        }, { new: true });

        res.status(200).send({
            success: true,
            data: updated,
            message: "Employee Updated"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Employee.findOneAndDelete({_id: id});

        res.status(200).send({
            success: true,
            data: deleted,
            message: "Employee Deleted"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed",
            errors: [error.message]
        })
    }
}

// exports.validate = (method) => {
//     switch (method) {
//         case "create": {
//             return [
//                 check('fullName', 'Full Name is required!').exists(),
//                 check('email', 'Email is required!').exists().isEmail(),
//                 check('userName', 'UserName is required!').exists(),
//                 check('contactNumber', 'Contact Number is required!').exists(),
//                 check('position', 'position is required!').exists(),
//                 check('department', 'department is required!').exists(),
//             ]
//         }
//     }
// }