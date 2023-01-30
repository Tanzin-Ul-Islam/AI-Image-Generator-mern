import * as dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import PostService from '../service/PostService.js';

class PostController {

    cloudinaryConfig = new cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    getAllPost = async (req, res) => {
        try {
            let result = await PostService.getAll();
            if (result) {
                res.status(200).send({ success: true, msg: 'Post data fetched successfully', data: result });
            } else {
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            }
        } catch (error) {
            res.status(500).send({ success: false, msg: 'Something went wrong!' });
        }
    }

    createPost = async (req, res) => {
        try {
            let { name, prompt, photo } = req.body;
            let photoUrl = await cloudinary.uploader.upload(photo);
            let result = await PostService.create(name, prompt, photoUrl);
            if (result) {
                res.status(201).send({ success: true, msg: 'Post created successfully', data: result });
            } else {
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            }
        } catch (error) {
            res.status(500).send({ success: false, msg: 'Something went wrong!' });
        }
    }
}
export default new PostController