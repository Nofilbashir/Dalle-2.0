import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connctDb from './mongoDb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'


dotenv.config()
const port = process.env.PORT || 5001

const app =express()
app.use(cors())
app.use(express.json({limit:"50mb"}))

//Routes
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)



app.get('/',  async(req,res) =>{
    res.send('Hello from Nofil')
})

const start = async () =>{
    try{
        connctDb(process.env.MONGO_URL)
        app.listen(port, ()=>{console.log(`server started at port ${port}`)})
    }catch(err){
        console.log(`Error Occured : "${err}"`)
    }
}

start()