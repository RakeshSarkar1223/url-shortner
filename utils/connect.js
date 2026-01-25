const mongoose = require("mongoose");

const connect = async (uri) => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`Mongo_DB connected on ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
    }
}


module.exports = connect;