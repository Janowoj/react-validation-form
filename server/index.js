const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bodyParser = require("body-parser");
const cors = require("cors");

// Create express app

const app = express()

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", cors(), async (req, res)=>{
    let {amount, id} = req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment",
            payment_method: id,
            confirm: true
        })

        console.log("Payment", payment)
        res.json({
            message: "Payment was successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server is running")
});

