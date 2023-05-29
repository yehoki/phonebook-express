import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static("build"));


morgan.token("post-req", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-req"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  const time = new Date();
  const info = persons.length;
res.send(`
  Phonebook has info for ${info} people
  <br/>
  ${time}`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get(`/api/persons/:id`, (req, res) => {
  const id = Number(req.params.id);
  const findPerson = persons.find((person) => person.id === id);
  if (findPerson) {
    res.json(findPerson);
  } else {
    res.status(404).end();
  }
});

const findFirstFreeId = () => {
  if (persons.length === 0) {
    return 1;
  }
  let highest = 0;
  persons.forEach((person) => {
    if (person.id > highest) {
      highest = person.id;
    }
  });
  const findArr = [];
  for (let i = 0; i < highest; i++) {
    findArr.push(i + 1);
  }
  const personsIds = persons.map((person) => person.id);
  const lowestIdAvail =
    persons.length === findArr.length
      ? highest + 1
      : Math.min(findArr.filter((person) => !personsIds.includes(person)));
  return lowestIdAvail;
};

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).send("The name is missing!");
  } else if (!person.number) {
    return res.status(400).send("The number is missing");
  }

  const findNames = persons.filter(
    (personName) => personName.name.toLowerCase() === person.name.toLowerCase()
  );
  if (findNames.length !== 0) {
    return res
      .status(400)
      .send(`${person.name} already exists in the phonebook!`)
      .end();
  }
  const id = findFirstFreeId();
  const newPerson = {
    id: id,
    name: person.name,
    number: person.number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

app.listen(PORT, () => {
  console.log(
    `Server running at https://nodejs-production-e3f7.up.railway.app on port ${PORT}`
  );
});
