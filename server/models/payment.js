const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    transaction_id: String,
    amount: Number,
    currency: String,
    customer_name: String,
    customer_email: String,
    status: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
