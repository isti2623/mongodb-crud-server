const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


//MongoDb Part

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mydbuser1:an9UDvjpwCGLguuP@cluster0.sovrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("ProductList");
        const productCollection = database.collection("product");
        //GET API
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })
        // POST method
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            console.log('hitting the post');
            res.json(result);
        })

        //DELETE API
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            res.json(result);
        })


    } finally {
        //await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})