const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// assairment10
// Y6PaRA9p7WhNsIyR
// db_users = "assairment10";
//* mondodb add Middleware :

app.use(express.json());
app.use(cors());
const uri = `mongodb+srv://${process.env.db_users}:${process.env.db_passwrods}@cluster0.hohlyvu.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
console.log("88", process.env.db_users);
console.log("===password===", process.env.db_passwrods);
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    //* post connect:
    const db = client.db("all_products");
    const productsCollection = db.collection("products");
    const exportsCollection = db.collection("exportsproducts");
    const importsCollection = db.collection("importsproducts");
    const usersCollection = db.collection("users");

    //* user collection connect :
    app.post("/users", async (req, res) => {
      const newusers = req.body;
      const email = req.body.email;
      const query = { email: email };
      const existingusers = await usersCollection.findOne(query);
      if (existingusers) {
        res.send({ message: "already exist!" });
      } else {
        const result = await usersCollection.insertOne(newusers);
        res.send(result);
      }
    });
    //get my export from productcollection by email
    app.get("/my-export", async (req, res) => {
      const email = req.query.email;
      const result = await productsCollection
        .find({ createdBy: email })
        .toArray();
      res.send(result);
    });
    app.put("/allimportsproducts/:id", async (req, res) => {
      const newProducts = req.body;
      const result = await importsCollection.insertOne(newProducts);
      console.log(newProducts);
      // *

      const id = req.params.id;
      console.log(id);
      // const id = data._id;
      const filter = { _id: new ObjectId(id) };
      const updateimport = {
        // $inc: { importquantity: importquantity.value },
        $inc: { importquantity: importedQuantity },
        // $set: newProducts,
      };
      const option = { upsert: true };
      const importcount = await productsCollection.updateOne(
        filter,
        updateimport,
        option
      );
      // *
      console.log(importcount);
      res.send({
        success: true,
        result,
        importcount,
      });
      // console.log(result);
    });
    app.get("/my-import", async (req, res) => {
      const email = req.query.email;
      const userimportQuantity = req.query.importedQuantity;
      console.log({ email, userimportQuantity });
      // const data = req.body;
      const query = {};
      if (email) {
        query.importedBy = email;
      }
      const result = await importsCollection
        .find({ importedBy: email })
        .toArray();
      res.send(result);

      console.log(result);
    });
    // app.get("/importsproducts", async (req, res) => {
    //   const email = req.query.email;
    //   const query = {};
    //   if (email) {
    //     query.createdBy = email;
    //   }
    //   const result = await importsCollection.find().toArray();
    //   res.send({
    //     success: true,
    //     result,
    //   });
    // });
    app.post("/my-import", async (req, res) => {
      const newProducts = req.body;
      const result = await importsCollection.insertOne(newProducts);
      res.send(result);
    });
    app.delete("/my-import/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await importsCollection.deleteOne(query);
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      // console.log(req.query);
      // const email = req.query.email;
      // const query = {};
      // if (email) {
      //   query.email = email;
      // }
      // const projectfield = {
      //   _id: 0,
      //   productName: 1,
      //   productImage: 2,
      //   price: 3,
      //   originCountry: 4,
      //   rating: 5,
      //   availableQuantity: 6,
      //   createdAt: 7,
      //   description: 8,
      //   category: 9,
      // };
      const result = await productsCollection
        // .find(query)
        .find()
        // .find({ createdBy: email })

        // .sort({ price: 1 })
        .sort({ createdAt: -1 })
        // .skip(2)
        // .limit(6)
        // .project(projectfield);
        .project()
        .toArray();
      // const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/latest-products", async (req, res) => {
      const result = await productsCollection
        .find()
        // .sort({ price: -1 })
        .sort({ createdAt: -1 })
        // .skip(2)
        .limit(6)
        .project()
        .toArray();
      // const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/products/:id", async (req, res) => {
      const id = req.params;
      // const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send({
        success: true,
        result,
      });
    });
    app.post("/products", async (req, res) => {
      const newProducts = req.body;
      const result = await productsCollection.insertOne(newProducts);
      console.log(result);
      res.send(result);
      // res.send(newProducts);
      // res.send(productsCollection.insertOne(newProducts));
      // res.send("result");

      // app.get("/", (req, res) => {
      //   res.send("Hello World! Assairment 10 client side**");
      // });

      // app.listen(port, () => {
      //   console.log(`Example app listening on port ${port}`);
      // });
    });
    // all product search :

    app.get("/search", async (req, res) => {
      const search_text = req.query.search;
      const result = await productsCollection
        .find({ productName: { $regex: search_text, $options: "i" } })
        .toArray();
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });
    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updatedproducts = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: { name: updatedproducts.name, price: updatedproducts.price },
      };
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    await client.close();
  }
  // finally {
  // Ensures that the client will close when you finish/error
  // await client.close();
  // }
}
run().catch(console.dir);
//*

app.get("/", (req, res) => {
  res.send("Hello World! Assairment 10 client side**");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
