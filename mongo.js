import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Give password as an argument");
  process.exit(1);
}

const password = process.argv[2];

const mongoURL = `mongodb+srv://testuser:${password}@bookmarkt.vm0t4pg.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(mongoURL).then(() => console.log("connected"));

person.save().then((res) => {
  mongoose.connection.close();
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "TEST",
  number: "01204124",
});
