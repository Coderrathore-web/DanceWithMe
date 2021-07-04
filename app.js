const express=require("express")
const path=require('path')
const fs=require('fs')
const pug=require('pug')
const app=express();
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
// var jsonParser = bodyParser.json()
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port=80;


const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  add: String,
});
const Contact = mongoose.model('Contact', contactSchema);
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


// endpoints
app.get('/',(req,res)=>{
    res.status(200).render('home.pug')
})
app.get('/contact',(req,res)=>{
  res.status(200).render('contact.pug')
})
app.post('/contact', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
  res.send("This item has been saved to the database")
  }).catch(()=>{
  res.status(400).send("item was not saved to the databse")
})
})
app.get('/about',(req,res)=>{
  res.status(200).render('about.pug')
})
app.get('/services',(req,res)=>{
  res.status(200).render('services.pug')
})
app.get('/class',(req,res)=>{
  res.status(200).render('class.pug')
})
//SERVER STARTING
  app.listen(port,()=>{
console.log(`The application is running succesfully at port ${port}`)
  })