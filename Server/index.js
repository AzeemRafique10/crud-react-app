const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://urbancrime19:1ILFugcfYF8Gc5s8@cluster0.ihn1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/crud-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  const user = new User({ name, age });
  await user.save();
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.put("/users/:id", async (req, res) => {
  const { name, age } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, age },
    { new: true }
  );
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
