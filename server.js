import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userroutes from "./routes/index.route.js";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const corsOptions = {
    origin: 'https://csr-funding-frontend-2.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', userroutes);

const PORT =process.env.PORT || 5000;

mongoose.connect('mongodb+srv://gaganraghav143:bicx13oInLIPt3iB@cluster0.yzbwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(()=> {console.log("connected to database")})
        .catch(()=> console.log("could not connect to database"));

app.listen(PORT, ()=> {
    console.log(`server running on ${PORT}`);
});