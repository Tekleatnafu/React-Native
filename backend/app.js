const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const database = require("./db");
const cors = require("cors");

database.connectDB();
const PRIVATE_KEY = "This is my Private key ";
const app = express();

app.use(express.json());

app.use(cors());

app.get("", (req, res) => {
  res.send("Hello World!");
});
//////////////////////////
//add Owener
app.post("/owners/signUp", async (req, res) => {
  try {
    const owner = req.body;
    const existing = await database.getOwnerByOwnername(owner.name);
    if (existing) {
      res.send({ success: 0, error: "The name is existing" });
      return;
    }
    owner.password = bcrypt.hashSync(owner.password, 10);
    const result = await database.addOwner(owner);

    res.send({ success: 1, data: result });
  } catch (error) {
    console.log(error);
    res.send({ success: 0, error: "Adding Owner Error" });
  }
});

//Login part
app.post("/owners/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const result = await database.getOwnerByOwnername(name);
    console.log(result);
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        const token = jwt.sign({ name }, PRIVATE_KEY, {
          expiresIn: 365 * 24 * 60 * 60,
        });
        res.send({ success: 1, data: { token, name } });
      } else {
        res.send({ success: 0, error: "Wrong password!" });
      }
    } else {
      res.send({ success: 0, error: "Wrong name or Password" });
    }
  } catch (err) {
    res.send({ success: 0, error: "Login Error" });
  }
});

////////////////addFood/////////////////

app.post("/owners/:name/foods", async (req, res) => {
  try {
    const name = req.params.name;
    const foodParam = { ...req.body, date: new Date() };
    const result = await database.addFood(name, foodParam);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
//////////////////

//get all Foods
app.get("/owners/:name/foods", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await database.getAllFoods(name);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
//delete food
app.delete("/owners/:name/foods/:foodName/food", async (req, res) => {
  try {
    const name = req.params.name;
    const foodName = req.params.foodName;
    const result = await database.deleteFood(name, foodName);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//Edit food
app.put("/owners/:owner_name/foods/:fname", async (req, res) => {
  const ownerName = req.params.owner_name;
  const foodName = req.params.fname;
  const food = req.body;
  try {
    const result = await database.editFood(ownerName, foodName, food);
    res.send(result);
  } catch (error) {
    res.send(error, "in editFood XXXX....");
  }
});
///////////////////////////////
//add note
app.post("/owners/:name/notes", async (req, res) => {
  try {
    const name = req.params.name;
    const noteParam = { ...req.body, date: new Date() };
    const result = await database.addNote(name, noteParam);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//get all notes
app.get("/owners/:name/notes", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await database.getAllNotes(name);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
//delete note
app.delete("/owners/:name/notes/:header/note", async (req, res) => {
  try {
    const name = req.params.name;
    const header = req.params.header;
    const result = await database.deleteNote(name, header);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//get all owners
// app.get("/owners", async (req, res) => {
//   try {
//     const result = await database.getAllOwners();
//     res.send(result);
//   } catch (error) {
//     res.send(error);
//   }
// });

app.listen(3000, () => {
  console.log("Listning to 3000....");
});
