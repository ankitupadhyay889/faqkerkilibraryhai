const express = require('express')

const objectstocsv = require('objects-to-csv')

const fs = require("fs")

const app = express()

const faker = require('faker')

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.render("index")
})

app.post('/',async(req,res) => {

    var data = []

    var number = req.body.number
   

    for(var i=0;i<number;i++){
        data.push(
            {
                name:faker.name.findName(),
                email:faker.internet.email(),
                imageUrl:faker.image.imageUrl(),
                password:faker.internet.password()
            }
        )
    }

    // convert to csv file

    const csv = new objectstocsv(data);
 
  // Save to file:
  await csv.toDisk('./test.csv');
 


  res.download("./test.csv",() => {

    fs.unlinkSync("./test.csv")

  })



})


app.listen(PORT,() => {
    console.log("app is listening on port 5000")
})