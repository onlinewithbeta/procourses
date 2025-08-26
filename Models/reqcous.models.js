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

const courseReq = mongoose.model('proCourse',reqcoschema)

export default courseReq;