const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001
const authRouter = require("./routes/authRoutes")
const postRouter = require("./routes/postRoutes")
const adminRouter = require("./routes/adminRoutes")
const cors = require("cors")


const mongoose = require ('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
    
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err))



// middleware 

app.use(express.json())

app.use(cors())


// {
//     origin: [
//         'https://auditions-board-c0yirsg9y-bitterostrichs-projects.vercel.app',
//         "https://auditions-board-jmhnfy82i-bitterostrichs-projects.vercel.app/login",
//         "https://auditions-board-jmhnfy82i-bitterostrichs-projects.vercel.app",
//         "https://auditions-board.vercel.app/",
//         "http://localhost:3000"
//     ]
        
// }

app.use(authRouter)
app.use(postRouter)
app.use(adminRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

app.get('/', function (req, res){
    res.send('BEANS AND FISH AND EGGS AND CHIPS AND BACON AND SAUSAGE')
});

