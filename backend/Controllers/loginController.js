import User from "../Models/userModel.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            console.log("Email and password are required")
            return res.status(400).json({ error: "Email and password are required." });
        }
        
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found')
            return res.status(400).json({ error: "User not found. Please sign up." });
        }
        else{
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(' invalid password')
            return res.status(400).json({ error: "Invalid password." });
        }
    }   console.log("Login successful")
        return res.status(200).json({ message: "Login successful!", user });
        
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export default loginUser;
