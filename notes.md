## error :

require - express , cors
finally no , use catch

## problem : ❌

!findone - not working
!query search not working ✅
!data fetch error show after login
!jws , varify token , 10.2 - 1:3 ,
!verse - deployment
!firebase perminion
!deployment
!! logot problem

## TASK :

- 55.5 55.6 - IMPORT EXPORTS
- expalin query parameter(?) vs quary params(/)
- what is primary key and what is foreign key
- MIDDLEWARE ?
- post vs put
- .env file

## prompt :

```
i already have a products collections now i need to add exports FUNCTIONALITY . where people can add exports their own price for a product andother information take from a input from (a. Product Name
b. Product Image( image url)
c. Price
d. Origin Country
e. Rating
f. Available quantity
).after add export products the products will be add to allproducts section ,  i will be able to remove and update my exports . see status of the product i have exports etc. how should i store this exports information. what are different options i have what are the different criterias i should think to make the decision
```

what do you think when should i use component folder structure for a react application or when should i use the pages or feature wise folder structure

    app.post("/allimportsproducts/:id", async (req, res) => {
      const productId = req.params.id;
      const importData = req.body;

      const query = { _id: new ObjectId(productId) };
      const product = await productsCollection.findOne(query);


      const existingImport = await importsCollection.findOne({
        productID: productId,
        importedBy: importData.importedBy,
      });
      let importResult;
      if (existingImport) {
        const newTotalQuantity =
          existingImport.importedQuantity + importData.importedQuantity;

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
      else {
        const newImport = {
          productID: productId,
          productName: importData.productName,
          productImage: importData.productImage,
          price: importData.price,
          originCountry: importData.originCountry,
          rating: importData.rating,
          description: importData.description,
          category: importData.category,
          importedBy: importData.importedBy,
          importedQuantity: importData.importedQuantity,
          importedAt: new Date(),
          availableQuantity: parseInt(
            product.availableQuantity - importData.importedQuantity
          ),
        };

        importResult = await importsCollection.insertOne(newImport);
      }
      const updateResult = await productsCollection.updateOne(
        { _id: new ObjectId(productId) },
        { $inc: { availableQuantity: -importData.importedQuantity } }
      );
      res.send({
        message: "Product imported successfully",
        importResult: importResult,
        stockUpdate: updateResult,
      });

    });
