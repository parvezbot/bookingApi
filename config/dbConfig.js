const mongoose = require("mongoose");

const mongo_url =
    process.env.mongo_url || "mongodb://localhost:27017/bookingApi";
mongoose.connect(mongo_url);
const db = mongoose.connection;
db.on("connected", () => {
    console.log("mongo db connection successfull");
});
db.on("error", () => {
    console.log("mongo db connection failed");
});
