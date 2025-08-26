import mongoose from 'mongoose'
import cfg from './config/config.js'


async function connectDB(){
  try{
    await mongoose.connect(cfg.DB_URL).then(() => console.log("connected"));
  }catch(err){
    console.log(err.message)
  }
}

export default connectDB;


const RequestSchema = new mongoose.Schema({TimeT: { type: String, required: true }, 
  courseT: { type: String, required: true },
  ip: { type: String, required: true },
  Origin: { type: String, required: true },
  sessionT: { type: String, required: true },
  
})

const RequestCourses = mongoose.model("RequestCourses", RequestSchema);


