const mongoose = require('mongoose');
require("dotenv").config({path:"backend/config/.env"});

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Db connection is successfull"))
        .catch((error) => {
            console.log("issue in db connection");
            console.error(error.message);
            process.exit(1)
        });
}

module.exports = connectDB;
