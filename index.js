const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const { config, engine } = require('express-edge');
app.use(engine);
const fileUpload = require("express-fileUpload");
const session = require('express-session');
const  mongoStore = require('connect-mongo');
const conncetFlash = require('connect-flash')
const edge = require('edge.js')


//controller path define
const createPostController = require('./controllers/createPost')
const getPostController = require('./controllers/getPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const registerController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logOutController = require('./controllers/logout')



mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true, useUnifiedTopology: true });

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to mongoose')
});

// const mongoStore = new connectMongo(expressSession);

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    store: mongoStore.create({
       mongoUrl: 'mongodb://localhost/node-blog'
    })
}));

app.use(conncetFlash());
app.use(fileUpload());
app.use(express.static('public'));
app.use('/assets', express.static('public'));
app.set('views', `${__dirname}/views`);

app.use('*',(req,res,next) => {
    edge.global('auth',req.session.userId)
    next()
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')
const redirectAuth = require('./middleware/redirectAuth');


// app.use('/posts/store', storePost)

//get and post method   
app.get('/', homePageController);
app.get('/post/:id', getPostController);
app.get('/create/new',auth, createPostController);
app.post('/posts/store',storePost, storePostController);
app.get('/auth/login', redirectAuth, loginController);
app.post('/users/login', redirectAuth,loginUserController);
app.get('/auth/register', redirectAuth,registerController);
app.post('/users/register', redirectAuth,storeUserController);
app.get('/auth/logout', logOutController);





//middleware validation in applied here and is used in post/stores

// app.post('/posts/store',(req,res)=>{
//     console.log(req.body)
//     res.redirect('/')
// });

// app.get('/create/new', (req, res) => {
//     res.render('create');
// });

// app.get('/about', (req, res) => {
//     res.render('about')
// });

// app.get('/contact', (req, res) => {
//     res.render('contact')
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT,() => { console.log(`listening on port ${PORT}`)})


