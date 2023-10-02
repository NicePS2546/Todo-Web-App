import mongoose, { connect } from "mongoose";

export const connectTOmongoDB = async () =>{
    try{
         await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo Database connected");
    }catch(error){
        console.log("Error to Connect MongoDB: ".error);
    }

    
}
