import express from "express"
import "dotenv/config"
import path from "path"
import { webRoutes } from "routes/web"

const app = express()

//Call env
const port = process.env.PORT

//set engine cho ejs
app.set("view engine", `ejs`)
app.set("views", path.join(__dirname, '..', '/src/views'));

//set public file
app.use(express.static('public'))

// req.body execute JSON code
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


console.log(path.resolve())
//Route..
webRoutes(app)

app.listen(port, () => {
    if(port)
        console.log(`This port running on ${port}`)
    else
        console.log("Undefined PORT")
})
