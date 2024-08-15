import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userroutes from "./routes/index.route.js";



const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', userroutes);

const PORT =process.env.PORT || 5000;

mongoose.connect('mongodb+srv://gaganraghav143:bicx13oInLIPt3iB@cluster0.yzbwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(()=> {console.log("connected to database")})
        .catch(()=> console.log("could not connect to database"));

app.listen(PORT, ()=> {
    console.log(`server running on ${PORT}`);
});