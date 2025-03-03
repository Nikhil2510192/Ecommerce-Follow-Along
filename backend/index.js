import express from "express"
import 'dotenv/config'
import connectDB from "./db.js"

const app = express()
const port= process.env.PORT || 4000

app.use(express.json())

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