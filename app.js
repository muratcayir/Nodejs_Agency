const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload'); 
const fs = require('fs');
const Photo = require("./models/Photo");
const app = express();


//--DB CONNECT
mongoose.connect("mongodb://localhost/agency-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //URL okunmasını sağlıyor
app.use(express.json()); // Datayı JSON formatına çeviriyor
app.use(fileUpload()); // middleware olarak kaydediyoruz.
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//-- TEMPLATE ENGINE
app.set("view engine", "ejs");


//-ROUTES

app.get("/", async (req,res)=>{
   const photos = await Photo.find({});
   res.render("index", {
     photos,
   })
})

app.get("/photos/:id", async (req,res)=>{
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  })
})

app.get("/add", async (req,res)=>{
  res.render("add")
})

app.post("/photos", async (req, res) => {
  

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
     await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    });
    res.redirect("/");
  });
});

app.delete('/photos/:id', async (req, res) => {
  const photos = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public/' + photos.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

app.put('/photos/:id', async (req, res) => {
  let uploadeImage = req.files.image;
  
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.image= '/uploads/' + uploadeImage.name;
  photo.save()
  res.redirect(`/photos/${req.params.id}`);
});



app.get('/photos/edit/:id',async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port}'unda başlatıldı`);
});