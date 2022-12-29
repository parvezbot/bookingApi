const router = require("express").Router();
const { error } = require("console");
const { Hall } = require("../models/bookingModel");

// Add hall and seats
router.post("/halls", async (req, res) => {
    try {
        const newHall = new Hall(req.body);
        await newHall.save();
        return res.status(200).send({
            success: true,
            message: "Hall added successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

// Book seats in a hall
router.post("/halls/:hallId/book-seats", async (req, res) => {
    try {
        const hallId = req.params.hallId;
        const seats = req.body.seats;
        await isAvailable(hallId, seats);
        return res.status(200).send({
            success: true,
            message: "seats booked",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

// Function to check if the hall and seats are avaailable
const isAvailable = (hallId, seats) => {
    return new Promise((resolve, reject) => {
        Hall.findOne({ hallId }).then(
            (hall) => {
                if (!hall) {
                    return reject({
                        success: false,
                        message: `no ${hallId} hall avaialble`,
                    });
                }
                for (const row in seats) {
                    const givenRow = hall.row.get(row);
                    if (!givenRow) {
                        return reject({
                            success: false,
                            message: `no ${row} row avaialble`,
                        });
                    }
                    const numberOfSeats = givenRow.numberOfSeats;
                    const bookedSeats = new Set(givenRow.bookedSeats);
                    const seatsToBook = seats[row];
                    for (i in seatsToBook) {
                        if (seatsToBook[i] > numberOfSeats) {
                            return reject({
                                success: false,
                                message: `seat number exceeds total number of seats in row ${row}`,
                            });
                        }
                        if (bookedSeats.has(seatsToBook[i])) {
                            return reject({
                                success: false,
                                message: `seat ${seatsToBook[i]} already booked`,
                            });
                        }
                    }
                    hall.row.get(row).bookedSeats.push(...seatsToBook);
                }
                hall.save().then((success) => {
                    if (!success) {
                        return reject({
                            success: false,
                            message: "booking failed",
                        });
                    }
                    return resolve();
                });
            },
            (error) => {
                return reject(error);
            }
        );
    });
};
module.exports = router;
