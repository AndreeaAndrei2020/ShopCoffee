const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",

    },
    orderItems: [
      {
        name: { type: String, required: true },
        lastName: { type: String},
        qty: { type: Number, required: true },
        // image: { type: String, required: true },
        image: { type: String},
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      // adress: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },

      adress: { type: String },
      // city: { type: String },
      // postalCode: { type: String },
      // country: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_adress: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true.value,
      default: false,
    },
    paidAt: { type: Date },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
