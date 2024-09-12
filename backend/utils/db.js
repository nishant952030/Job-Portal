import mongoose from "mongoose"
const connectDB = async () => {
    try {
        console.log("Mongo URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo db connected successfully');
    }
    catch (error) {
        console.log(" error while connecting  to mongo:",error)
    }
}
export default connectDB;