import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const DatabaseConnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
            .then(() => {
                console.log("MongoDb connection successful.")
            }).catch((error) => {
                console.log(error);
            })
    } catch (error) {
        console.log(error)
    }
}

export {
    DatabaseConnection
}