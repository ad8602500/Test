
const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/mydatabase';


app.get('/products', async (req, res) => {
  const minPrice = parseFloat(req.query.minPrice); 
  
   
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

   
    const products = await db.collection('products')
      .find({ price: { $gt: minPrice } }) 
      .sort({ price: -1 }) 
      .toArray();


    await client.close();

  
    res.json(products);
  
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
