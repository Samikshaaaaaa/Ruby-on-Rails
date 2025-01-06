// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true },
  address: { type: String, maxlength: 400 },
  role: { type: String, enum: ["Admin", "Normal User", "Store Owner"], required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);

// models/Store.js
const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String, maxlength: 400 },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
});

storeSchema.virtual("averageRating").get(function () {
  if (!this.ratings.length) return 0;
  const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return sum / this.ratings.length;
});

module.exports = mongoose.model("Store", storeSchema);
