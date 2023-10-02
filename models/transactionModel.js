const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid:{
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "details is required"],
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

//export
const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
