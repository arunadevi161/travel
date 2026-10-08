const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Schema
const travelSchema = new mongoose.Schema({
    travellerId: String,
    name: String,
    destination: String,
    travelDate: String,
    budget: Number,
    email: String
});

// Model
const Traveller = mongoose.model("Traveller", travelSchema);

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Add Traveller
app.post("/travellers", async (req, res) => {

    console.log(req.body);

    try {
        const traveller = new Traveller({
            travellerId: req.body.travellerId,
            name: req.body.name,
            destination: req.body.destination,
            travelDate: req.body.travelDate,
            budget: req.body.budget,
            email: req.body.email
        });

        await traveller.save();

        res.send("Travel buddy added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding traveller");
    }
});

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});