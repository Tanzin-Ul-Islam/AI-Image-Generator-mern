import Router from "express";
import * as dotenv from "dotenv";
import PostController from "../controller/PostController.js";
dotenv.config();

const router = Router();

router.get('/', PostController.getAllPost);
router.post('/', PostController.createPost);

export default router;