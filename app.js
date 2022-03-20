const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
// const { render } = require('ejs');


const dbURI = "mongodb+srv://admin:admin@cluster0.mtesc.mongodb.net/blogpost?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));



// ******************** to turn on project uncomment app.listen(3000) under these statements *******************************

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://admin:admin@cluster0.otg45.mongodb.net/blogpost?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
    
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



// express app
const app = express();


// register view engine
app.set('view engine', 'ejs'); // by default it look for views folder

// app.set('views', 'myviews') // it looks for myviews folder

////////////////   app.listen(3000) /////////////////////////


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs')
});
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.use('/blogs', blogRoutes);

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('about');
});





//404 page
app.use((req, res) => {
    res.status(400).render('404', {title: '404'});
});

