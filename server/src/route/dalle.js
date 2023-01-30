import Router from "express";
import DalleController from "../controller/DalleController.js";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post('/', DalleController.generateImage);

export default router;