import mongoose from "mongoose";


const database = async() => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected Successfully")
        
    } catch (error) {
        console.log(error)
    }
}

export default database