const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());   // 👈 allow frontend to call API

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function startServer() {

  try {

    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("cars");
    const collection = db.collection("supercars");

    app.get("/", async (req, res) => {

      const cars = await collection.find().toArray();

      res.json(cars);

    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

}

startServer();