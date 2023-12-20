const express = require("express")
const app = express()
const mariadb = require("mariadb")
let cors = require("cors")
const bodyParser = require("body-parser")
const userRoute = require("./routes/userRoutes")
const godRoute = require('./routes/godRoutes')
const roleRoute = require('./routes/roleRoutes')

app.use(cors())
app.use(express.json())

app.use('/user', userRoute)
app.use('/god', godRoute)
app.use('/role', roleRoute)


app.listen(3000, () => {
    console.log("serverStart")
})