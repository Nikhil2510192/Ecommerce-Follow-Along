import express from "express"
import 'dotenv/config'
import connectDB from "./db.js"
import { router } from "./Routes/userRoutes.js"
import cors from "cors"

const app = express()
const port= process.env.PORT || 4000
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json())
app.use("/users",router)

connectDB().then(() => {
    app.get('/', (req, res) => {
        res.send("hello");
    });

    app.listen(port, () => {
        console.log(`Server is running on the port: http://localhost:${port}`);
    });
}).catch(error => {
    console.error("Failed to connect to the database", error);
});