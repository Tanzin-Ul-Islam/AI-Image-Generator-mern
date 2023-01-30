import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { DatabaseConnection } from "./db/connection.js";
import posts from "./src/route/posts.js";
import dalle from "./src/route/dalle.js";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/posts', posts);
app.use('/api/v1/dalle', dalle);

try {
    DatabaseConnection()
    app.listen(process.env.PORT, () => {
        console.log("server is running on port: " + process.env.PORT);
    })
} catch (error) {
    console.log(error)
}
