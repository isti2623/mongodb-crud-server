const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000

app.use(cors())


//MongoDb Part

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mydbuser1:an9UDvjpwCGLguuP@cluster0.sovrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("ProductList");
        const productCollection = ProductList.collection("product");




    } finally {
        await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})