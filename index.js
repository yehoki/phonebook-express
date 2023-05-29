import express from "express";
const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello matey");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
