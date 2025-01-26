import express from 'express'
import dotenv from 'dotenv'
import router from './routes/feedbackRoutes.js'
import cors from 'cors'
import apiTracking from './middleware/apiTracking.js'

const app=express()
dotenv.config()
app.use(express.json())
app.use(cors())

//app.use(apiTracking)
app.use(router)

app.listen(process.env.PORT||5000,()=>{
    console.log(`server is running on ${process.env.PORT||5000}`)
})
