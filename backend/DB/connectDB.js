import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import mongoose from "mongoose";

const connectDB =  async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected sucessfully.')
    }catch(error){
        console.log(error);
    }
}
export default connectDB;