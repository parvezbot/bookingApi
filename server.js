const express = require("express");
const app = express();

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 4000;
app.use(express.json());

const bookingRoute = require("./routes/bookingRoute");

app.use("/api", bookingRoute);

app.listen(port, () => console.log(`node server listening on port ${port}`));
