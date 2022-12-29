const mongoose = require("mongoose");

const rowSchema = new mongoose.Schema({
    numberOfSeats: {
        type: Number,
        required: true,
    },
    bookedSeats: {
        type: [Number],
        default: [],
    },
});

const hallSchema = new mongoose.Schema({
    hallId: {
        type: String,
        required: true,
        unique: true,
    },
    row: {
        type: Map,
        of: rowSchema,
        required: true,
    },
});
const Hall = mongoose.model("Hall", hallSchema);
module.exports = { Hall };
