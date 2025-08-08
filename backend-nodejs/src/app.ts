/// <reference path="types/index.d.ts" />

import cors from "cors"
import express from "express"
import "dotenv/config"
import path from "path"
import { webRoutes } from "routes/web"
import initDatabase from "config/seed"
import passport from "passport"
import configPassportLocal from "./middleware/passport.local"
import session from "express-session"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import { PrismaClient } from "@prisma/client"
import apiRoutes from "routes/api"


const app = express()
//Call env
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


//set engine cho ejs
app.set("view engine", `ejs`)
app.set("views", path.join(__dirname, '..', '/src/views'));

//set public file
app.use(express.static('public'))

// req.body execute JSON code
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//midleware
app.use(session({
  cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 *  1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(passport.initialize());
app.use(passport.authenticate('session')); // This uses the session defined above

configPassportLocal()

//config  global
app.use((req, res, next) => {
  res.locals.user = req.user || null // Pass user object to global
  next()
})

console.log(path.resolve())
initDatabase()
//Route..
webRoutes(app)
apiRoutes(app)

app.use(function(req,res){
    res.send("404 not found")
});

app.listen(port, () => {
    if(port)
        console.log(`This port running on ${port}`)
    else
        console.log("Undefined PORT")
})
