import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name:{type:String, required:[true, "Please Enter name"]},
    prompt:{type:String, required:[true, "Please Enter Prompt"]},
    photo:{type:String, required:[true, "Please Enter photo"]}
})

const PostModal = mongoose.model("PostModal", PostSchema)
export default PostModal