require("dotenv").config();
import express from "express";
import cors from "cors";


const app = express();
// //Enable cors
app.use(cors());

//import routes here
import weatherRoute from "./routes/weather";

//use routes here
app.use("/api/v1", weatherRoute);


export default app;
