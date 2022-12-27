const express = require('express')
const session = require('express-session')
const cookiesess = require('cookie-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

const cors = require('cors')

const passport = require('passport')
const bcrypt = require('bcryptjs')
const fs = require('file-system')
const path = require('path')
const multer = require('multer')
const flash = require('express-flash')

const mongoose = require('mongoose')
const displayBoxData = require('./models/displayBoxData')
const signUpCode = require('./models/signUpCode')
const user = require('./models/user')

const uploadPath = path.join(__dirname, "uploads")
const origin = 'https://deluxe-gecko-33a09b.netlify.app'
//const origin = 'http://localhost:3000'
var totalFiles = 0

app.use(cors({
  origin: origin,
  credentials: true
}));

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index', {
      title: 'View Engine Demo'
  })
})

app.use(express.urlencoded({extended: true}));

app.use(session({ 
  secret: 'something', 
  maxAge : 60*60*1000,
  resave: false,
  saveUninitialized: false,
  sameSite: "none",
  secure: true
}));
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser())
 
require('./passportConfig')(passport)


app.enable('trust proxy')
app.use(express.urlencoded({extended: false}))
require('dotenv').config()
app.use(flash())

const connectDatabase = async () => {
  console.log("connceting to database")
  try {
    console.log("inside of try " + process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, maxIdleTimeMS : 270000, minPoolSize : 2, maxPoolSize : 4});
    console.log("connected to database");
  } catch (error) {
    console.log("failed to connect")
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();

//mongoose.connect("mongodb://127.0.0.1/portfolioDB")

fs.readdir(uploadPath, (err, files) => {
  console.log("FILES:::::")
  files.forEach(function(file){
    console.log("Files: " + file)
  })
  totalFiles = files.length
})

fs.readdir(uploadPath, (err, files) => {
  console.log("FILES:::::")
  files.forEach(function(file){
    console.log("Files: " + file)
  })
  totalFiles = files.length
})

// //Send Number of Images to Client
app.post('/img-count', (req, res) => {
  // console.log(totalFiles)
  res.json(totalFiles)
})

// //Send Description to Client
app.post('/get-post', async (req, res) => {
  const imgName = req.query.imgName
  // console.log("image name123123: " + imgName)
  await displayBoxData.findOne({ imageName: imgName })
  .then(response => {
    // console.log(response)
    res.json(response)
  })
})

//Send upload images
app.post('/get-images', (req, res) => {
  const files = fs.readdirSync(uploadPath)
  app.use(express.static(uploadPath))
  res.json(files[req.query.index])
})


//Check if User is Properly Verified
app.post('/checkCode', async (req, res) => {  
  const userCode = req.query.code;
  console.log("query " + userCode)
  const search = await signUpCode.findOne();
  await signUpCode.findOne({ code: userCode })
  .then(response => {
    if (response == undefined) {
      console.log(search)
      console.log("WRONG CODE")
      res.json(false)
    } else {
      console.log("CORRECT CODE")
      res.json(true)
    }
  })
})

//Get Username
app.post('/get-user', async (req, res) => {
    console.log("passport: " + req.session.passport)
    if (req.user) {
      const userId = req.session.passport.user
      const getUser = await user.findById(userId).then(res => {
        if (res) {
          const data = res.username
          return data
        }
      })
      console.log("sending user")
      res.json(getUser)
    } else {
      console.log("not valid user")
      res.json("")
    }
  })

  app.post('/get-auth', (req, res) => {
    if (req.isAuthenticated()) {
      console.log("user authenticated")
      res.json(true)
    } else {
      console.log("user not authenticated")
      res.json(false)
    }
  })

//Login
app.post('/login', (req, res, next) => {
    passport.authenticate('local', function(e, user, info) {
      if(e) {
        return next(e);
      }
      if(info) {
        return res.redirect(origin + '/login?error=' + info.message)
      }
      req.logIn(user, e => {
          if(e) return next(e);
          console.log("logged in USER" + user)
          return res.redirect(origin + '/submit')
      });
    })(req, res, next);
});

// Logout
app.post('/logout', (req, res, next) => {
  req.logout(function(err){
    if (err) { return next(err) }
    res.redirect(origin)
  })
})

// Sign Up
app.post('/verification', async (req, res) => {
  const userCode = req.body.code
  console.log("verif " + userCode)
  console.log(await signUpCode.find())
  await signUpCode.findOne({ code: userCode })
  .then(response => {
    if (response == undefined) {
      res.redirect(origin + '/verification?error=wrong code')
    } else {
      res.redirect(origin + '/createAccount?code=' + userCode)
    }
  })
})

// Create Account Post
app.post('/createAccount', async (req, res) => {
    const name = req.body.username
    const pass = req.body.password
    const confirmPass = req.body.confirmpass
    const verifCode = req.body.verifCode
    if (pass == confirmPass) {
      console.log("pass 1 = " + pass + " pass 2 " + confirmPass)
        await user.findOne({ username: name })
        .then( async response => {
            if (response == undefined) {
                const hashedPass = await bcrypt.hash(pass, 10)
                user.create({
                    username: name,
                    password: hashedPass
                }).then(() => {
                  console.log(verifCode)
                  signUpCode.deleteOne({ code: verifCode }).then()
                })
                res.redirect(origin)
            } else {
                res.redirect(origin + '/createAccount?code=' + verifCode + '&error=username already used')
            }
        })
    } else {
        res.redirect(origin + '/createAccount?code='+ verifCode + '&error=passwords do not match')
    }
})

// Set Storage Engine
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000}
}).single('img')

// Submit Project Post
app.post('/submit', async (req, res) => {
  const userId = req.session.passport.user
  const getUser = await user.findById(userId).then(res => {
    if (res) {
      const data = res.username
      console.log(data)
      return data
    }
  })
  upload(req, res, (err) => {
    if (err) {
      res.redirect(origin + '/submit?error=' + err)
    } else if (req.file == undefined) {
      res.redirect(origin + '/submit?error=no image included')
    } else {
      displayBoxData.create({ 
        imageName: req.file.filename, 
        description: req.body.description,
        author: getUser
      })
      res.redirect(origin + '/submit')
    }
  })  
})

app.listen(process.env.PORT, () => {
    console.log("new")
}); 