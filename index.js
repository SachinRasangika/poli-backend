const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
// const auth = require('./app/confing/auth_check');

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(auth);

const uri = "mongodb+srv://admin:admin123@cluster0.dnfex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Mongo DB connected....")).catch((err) => {
    console.log(`Could not connect to the database ${err}`);
    process.exit();
});

app.get('/', async function (req, res) {
    res.send('Server is running...')
})

//import routes
const userRoutes = require('./app/routes/user.route');
const clientRoutes = require('./app/routes/client.route');

//use routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})