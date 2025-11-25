const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

//*firebase authentication in serversite :
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//*

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
    // const exportsCollection = db.collection("exportsproducts");
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
    // //*import ::
    // app.post("/allimportsproducts/:id", async (req, res) => {
    //   const newProducts = req.body;
    //   const id = req.params.id;
    //   console.log(newProducts);
    //   console.log(id);

    //   // *import collection add..
    //   const result = await importsCollection.insertOne(newProducts);
    //   // const id = data._id;
    //   const filter = { productId: new ObjectId(id) };
    //   const updateimport = {
    //     // $inc: { importquantity: 1 },
    //     $inc: { availableQuantity: -newProducts.importedQuantity },
    //     // $inc: { importquantity: importedQuantity },
    //     // $set: newProducts,
    //   };
    //   // const option = { upsert: true };
    //   const importcount = await productsCollection.updateOne(
    //     filter,
    //     updateimport
    //     // option
    //   );
    //   // *
    //   console.log(importcount);
    //   res.send({
    //     success: true,
    //     result,
    //     importcount,
    //   });
    //   // console.log(result);
    // });

    //*dublicate import :
    app.post("/allimportsproducts/:id", async (req, res) => {
      const productId = req.params.id;
      const importData = req.body;
      // console.log(importData);
      // console.log(id);
      const importedQuantity = parseInt(importData.importedQuantity);

      //!invalid data
      //!invalid data
      if (!importedQuantity || importedQuantity <= 0) {
        return res.status(400).send({
          success: false,
          error: "Invalid quantity",
        });
      }
      //*find product query :
      const query = { _id: new ObjectId(productId) };
      //*find data
      const product = await productsCollection.findOne(query);
      //!product not found
      if (!product) {
        return res.status(404).send({
          success: false,
          error: "Product not found",
        });
      }
      //!Check stock availability
      if (product.availableQuantity < importedQuantity) {
        return res.status(400).send({
          success: false,
          error: `Not enough stock. Only ${product.availableQuantity} available`,
        });
      }
      //  ! doublicate data checking, Check if user already imported this product
      const existingImport = await importsCollection.findOne({
        productID: productId, // Store as string for easy comparison
        importedBy: importData.importedBy,
        // availableQuantity: product.availableQuantity,
      });
      //*importResult variable declare
      let importResult;
      //*existing user :
      if (existingImport) {
        // ✅ UPDATE existing import (add to quantity)
        const newTotalQuantity =
          existingImport.importedQuantity + importData.importedQuantity;
        // const newavailableQuantity =
        //   existingImport.availableQuantity - importData.importedQuantity;

        importResult = await importsCollection.updateOne(
          { _id: existingImport._id },
          {
            $set: {
              importedQuantity: newTotalQuantity,
              updatedAt: new Date(),
              availableQuantity: parseInt(
                product.availableQuantity - importData.importedQuantity
              ),
            },
          }
        );
      }
      //*new usew :
      else {
        // ✅ CREATE new import
        const newImport = {
          productID: productId, // Store product ID as string
          productName: importData.productName,
          productImage: importData.productImage,
          price: importData.price,
          originCountry: importData.originCountry,
          rating: importData.rating,
          description: importData.description,
          category: importData.category,
          importedBy: importData.importedBy,
          importedQuantity: importedQuantity,
          importedAt: new Date(),
          // availableQuantity: newavailableQuantity,
          // availableQuantity:
          //   product.availableQuantity - importData.importedQuantity,
          availableQuantity: parseInt(
            product.availableQuantity - importedQuantity
          ),
        };

        // *import collection add..
        importResult = await importsCollection.insertOne(newImport);
        console.log("✅ Created new import");
      }
      // 5. Decrease product stock
      const updateResult = await productsCollection.updateOne(
        { _id: new ObjectId(productId) },
        { $inc: { availableQuantity: -importedQuantity } }
      );
      res.send({
        success: true,
        message: "Product imported successfully",
        importResult: importResult,
        stockUpdate: updateResult,
      });
      //?=======end=======
      // *import collection add..
      // const result = await importsCollection.insertOne(importData);
      // const id = data._id;
      // const filter = { _id: new ObjectId(productId) };
      // const updateimport = {
      //   // $inc: { importquantity: 1 },
      //   $inc: { availableQuantity: -importData.importedQuantity },
      //   // $inc: { importquantity: importedQuantity },
      //   // $set: newProducts,
      // };
      // // const option = { upsert: true };
      // const importcount = await productsCollection.updateOne(
      //   filter,
      //   updateimport
      //   // option
      // );
      // *
      // console.log(importcount);
      // res.send({
      //   success: true,
      //   result,
      //   importcount,
      // });
      // console.log(result);
    });

    //*import :: quantity filter
    // app.put("/allimportsproducts/:id", async (req, res) => {
    //   // const newProducts = req.body;
    //   // const id = req.params.id;
    //   // console.log(newProducts);
    //   // console.log(id);

    //   // *import collection add..

    //   const result = await importsCollection.insertOne(newProducts);
    //   // const id = data._id;
    //   const filter = { productId: new ObjectId(id) };
    //   const updateimport = {
    //     // $inc: { importquantity: 1 },
    //     $inc: { availableQuantity: -newProducts.importedQuantity },
    //     // $inc: { importquantity: importedQuantity },
    //     // $set: newProducts,
    //   };
    //   // const option = { upsert: true };
    //   const importcount = await productsCollection.updateOne(
    //     filter,
    //     updateimport
    //     // option
    //   );
    //   // *
    //   console.log(importcount);
    //   res.send({
    //     success: true,
    //     result,
    //     importcount,
    //   });
    //   // console.log(result);
    // });

    //*import :
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
    //*import : not used
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

    //*all product load
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
    //*6 product load
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
    //*product details page
    app.get("/products/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send({
        success: true,
        result,
      });
    });
    //*add export :
    app.post("/products", async (req, res) => {
      const newProducts = req.body;
      const result = await productsCollection.insertOne(newProducts);
      console.log(result);
      res.send(result);
    });
    //*get my export from productcollection by email
    app.get("/my-export", async (req, res) => {
      const email = req.query.email;
      const result = await productsCollection
        .find({ createdBy: email })
        .toArray();
      res.send(result);
    });
    //*all product search :
    app.get("/search", async (req, res) => {
      const search_text = req.query.search;
      const result = await productsCollection
        .find({ productName: { $regex: search_text, $options: "i" } })
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    });
    //*update export product :
    app.put("/products/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      // console.log(data);
      // console.log(id);
      const ObjId = new ObjectId(id);
      const filter = { _id: ObjId };
      const update = { $set: data };

      const result = await productsCollection.updateOne(filter, update);
      res.send({
        success: true,
        result,
      });
    });
    //*delete export product :
    app.delete("/products/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send({
        success: true,
        result,
      });
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
    console.log("010010");
    // app.patch("/products/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedproducts = req.body;
    //   const query = { _id: new ObjectId(id) };
    //   const update = {
    //     $set: { name: updatedproducts.name, price: updatedproducts.price },
    //   };
    //   const result = await productsCollection.updateOne(query, update);
    //   res.send(result);
    // });
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
  res.send("Hello World! Assairment 10 client side");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//! trash
// app.post("/allimportsproducts/:id", async (req, res) => {
//   const productId = req.params.id;
//   const importData = req.body;

//   const query = { _id: new ObjectId(productId) };
//   const product = await productsCollection.findOne(query);

//   const existingImport = await importsCollection.findOne({
//     productID: productId,
//     importedBy: importData.importedBy,
//   });
//   let importResult;
//   if (existingImport) {
//     const newTotalQuantity =
//       existingImport.importedQuantity + importData.importedQuantity;

//     importResult = await importsCollection.updateOne(
//       { _id: existingImport._id },
//       {
//         $set: {
//           importedQuantity: newTotalQuantity,
//           updatedAt: new Date(),
//           availableQuantity: parseInt(
//             product.availableQuantity - importData.importedQuantity
//           ),
//         },
//       }
//     );
//   } else {
//     const newImport = {
//       productID: productId,
//       productName: importData.productName,
//       productImage: importData.productImage,
//       price: importData.price,
//       originCountry: importData.originCountry,
//       rating: importData.rating,
//       description: importData.description,
//       category: importData.category,
//       importedBy: importData.importedBy,
//       importedQuantity: importData.importedQuantity,
//       importedAt: new Date(),
//       availableQuantity: parseInt(
//         product.availableQuantity - importData.importedQuantity
//       ),
//     };

//     importResult = await importsCollection.insertOne(newImport);
//   }
//   const updateResult = await productsCollection.updateOne(
//     { _id: new ObjectId(productId) },
//     { $inc: { availableQuantity: -importData.importedQuantity } }
//   );
//   res.send({
//     message: "Product imported successfully",
//     importResult: importResult,
//     stockUpdate: updateResult,
//   });
// });

//
