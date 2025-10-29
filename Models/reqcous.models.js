import mongoose from "mongoose";

const reqcoschema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        minLength: 2,
        maxLeng: 10
    },
    session: {
        type: String,
        required: true,
        minLength: 2,
        maxLeng: 10
    },
    origin: {
        type: String,
        required: false,
        minLength: 2,
        maxLeng: 100 
    },
    time: {
        type: String,
        required: true,
        minLength: 2,
    },
    user: {
        type: String,
        required: true,
        minLength: 2,
    },
    ip: {
        type: String,
        required: true,
        minLength: 2,
    },
});
//TimeT
const nowM = new Date().toISOString();
// Split the ISO string into date and time parts
const [datePart, timePart] = nowM.split('T');

const courseReq = mongoose.model(`proCourse${datePart}`,reqcoschema)

export default courseReq;