## Backend installed

1. run :

```
npm init -y
```

2. add this line in package.json : `"start": "node index.js",`

```
 "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

3. installed Express.js + cors + mongodb
   <br> link : https://expressjs.com/

```
npm i express cors mongodb
```

or

```
    npm install mongodb --save
```

Note : Express.js + cors add in the dependence 4. create a `.gitignore` file write `node_modules` file name

5. add code in index.js:
   ![alt text](image.png)

```
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```

6. install nodemon : [what is nodemon and benefit of it]

```
    npm install -g nodemon
```

7. run to start code :

```
nodemon index.js
```

or :

```
node index.js
```

8. search : http://localhost:3000/

---

## mongodb cluster add:

1.  add mongodb cluster :

```
const { MongoClient, ServerApiVersion } = require('mongodb');
```

2.set url :

```
const uri = "mongodb+srv://siham:<db_password>@cluster0.hohlyvu.mongodb.net/?appName=Cluster0";

```

3. client :

```
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
```

4.add functionality :

```
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

```

5. set Build-in-role : admin

---

## vercel deployment :

for serversite deployment : vercel
`npm i -g vercel`
`vercel`
`vercel --prod`

## add .env file

env file: ` npm i dotenv`
`require("dotenv").config();`

## sweetalert :

`npm install sweetalert2`

## firebase-admin security to backend data :

`npm i firebase-admin`
