const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "cars";

async function startServer() {

  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db(dbName);

  // dynamic route
  app.get("/api/cars/:type", async (req, res) => {

    try {

      const type = req.params.type; // supercars or hypercars
      const collection = db.collection(type);

      const cars = await collection.find().toArray();

      res.json(cars);

    } catch (error) {

      res.status(500).json({ error: "Failed to fetch cars" });

    }

  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

}

startServer();