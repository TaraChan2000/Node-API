require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')



const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND


var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.use(errorMiddleware);

mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${3000}`)
    });
}).catch((error) => {
    console.log(error)
})