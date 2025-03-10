import User from "../Models/userModel.js";


const createUser = async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;

        console.log("Received Data:", { username, email, password, userType });

        if (!username || !email || !password || !userType) {
            return res.status(400).json({ error: "All fields (username, email, password, userType) are required." });
        }

        if (!['buyer', 'vendor'].includes(userType)) {
            return res.status(400).json({ error: "User type must be either 'buyer' or 'vendor'." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("Error: Username already exists");
            return res.status(400).json({ error: "Username already exists." });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            console.log("Error: Email already registered");
            return res.status(400).json({ error: "Email is already registered." });
        }


        const newUser = new User({ username, email, password, userType });
        await newUser.save(); 
        console.log("Success: User created");
        res.status(201).json({ message: "User created successfully!", user: newUser });


    } catch (error) {
        console.error("Error in createUser:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export default createUser;
