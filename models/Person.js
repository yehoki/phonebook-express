const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const mongoURL = process.env.MONGODB_URI;
console.log("connecting to", mongoURL);

mongoose
  .connect(mongoURL)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, `Cannot have name lengths shorter than 3 characters`],
    maxLength: [63, `Name length cannot exceed 63 characters`],
    required: true
  },
  number: {
    type: String,
    minLength:8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{6,}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema);