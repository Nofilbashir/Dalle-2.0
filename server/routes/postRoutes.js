import express from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import PostModal from '../mongoDb/modals/posts.js'

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_CLOUD_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const router = express.Router()

//GET ALL POSTS
router.get('/',async(req, res)=>{
    try{
        const AllPosts = await PostModal.find({})
        res.status(200).json({success:true, data:AllPosts})
    }catch(error){
        res.status(500).json({success:false, message: error})
    }
})



//CREATE A POST
router.post('/',async(req, res)=>{
    try{
        const {name, prompt, photo} = req.body
        const photoUrl = await cloudinary.uploader.upload(photo);
        
        // saving to database
        const newPost = await PostModal.create({
            name,
            prompt,
            photo:photoUrl.url
        })
    
        res.status(200).json({success:true, data: newPost})
    }catch(error){
        res.status(500).json({success:false, message: error})

    }
 
})

export default router