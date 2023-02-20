const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

//cors
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gxh5n1b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const WebsiteCollection = client.db("Portfolio").collection("My websites")
    const SkillCollection = client.db("Portfolio").collection("Skills")
    //websites
    app.get("/websites", async(req,res)=>{
      const query={}
      const cursor = WebsiteCollection.find(query)
      const result= await cursor.toArray()
      res.send(result)
    })
    //skills
    app.get("/skills", async(req,res)=>{
      const query={}
      const cursor = SkillCollection.find(query)
      const result= await cursor.toArray()
      res.send(result)
    })
    //website by id 
    app.get("/websites/:id", async(req,res)=>{
      const id= req.params.id;
      const query = {_id:ObjectId(id)};
      const website = await WebsiteCollection.findOne(query);
      res.send(website);
    })
  } 
  finally {


  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello from portfolio backend!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
