// let studentName; // Java
// let StudentName; // C#
// let student_name; //javascript/typescript

const express = require('express')
const app = express()
const db = require('./app/confing/database_config');

db.sequelize.sync({ force: false, logging: false}).then(data => {
    console.log("Database Connected");
}).catch(err => {
    console.log("Database Error: ", err)
})

app.get('/', async function (req, res) {
    res.send('Server is running...')
})

//import routes
const userRoutes = require('./app/routes/user.route');

//use routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})