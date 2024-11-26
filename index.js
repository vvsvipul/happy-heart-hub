require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const dburl = process.env.DB

const userRouter = require("./routes/user.js")
const recordRouter = require("./routes/records.js")
const session = require('express-session');
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const MongoStore = require('connect-mongo');
const port = process.env.PORT|8080
console.log(dburl)

async function main() {
    await mongoose.connect(dburl);
}

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "/public")))



const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
      secret:process.env.SECRET,
    },
    touchAfter:24*3600
  })
  
  store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
  });
  const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+1000*60*60*24*7,
      maxAge:1000*60*60*24*7,
      httpOnly:true, //cross scripting attack
    }
  }
  

app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next()
})





app.get("/", async (req, res) => {

    // let p = await predict(29, 2, 100, 150, 110, 80, 0, 0);
    // console.log(p)
    // let prop = "" + p;
    // res.send(prop)
    res.render("home.ejs")
})
app.use("/records",recordRouter)
app.use("/",userRouter)



app.listen(port, () => {
    console.log("server is listening to port 8080");
});
