import User from "../Model/model.js"

const createUser = async(req,res)=>{
            try{
               const {userName,email,password}=req.body

                        if (!userName || !email || !password) {
                            return res.status(400).json({ error: "All fields (user, email, password) are required." });
                        }

                        const existingUser = await User.findOne({ userName });
                            if (existingUser) {
                                return res.status(400).json({ error: "User name already exist." });
                            }

                        const existingEmail = await User.findOne({ email });
                        if (existingUser) {
                            return res.status(400).json({ error: "email is already registered." });
                        }

                const newUser=new User({userName,email,password})

                await newUser.save()
                res.status(201).json({ message: "User created successfully!",user: newUser})
                
            }catch(error){
                res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
}

export default createUser;