const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
const routes = require('./app/routes/routes');

// connect to mongodb
const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/bank'); 
mongoose.connection
.once("open", () => console.log('Connected to bank')) 
.on("error", error => {
    console.log("MongoDB Error: " + error);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use('/app', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

