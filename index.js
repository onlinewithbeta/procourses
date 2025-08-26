import express from "express";
import connectDB from "./db.js";
import courseRoute from "./Routes/courses.routes.js";
import cfg from "./config/config.js";
import cors from "cors";
//import serverless from "serverless-http";

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    console.log(req);
    res.send("Get Premuim procourses");
});
app.use("/procourses", courseRoute);

app.use("/", (req, res) => {
    res.send({
        body: req,
        message: "Resourse not found"
    });
});

//await connectDB();
//export const handler = serverless(app);


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port http://localhost:${PORT}`);
});
