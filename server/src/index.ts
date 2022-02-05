import express, { Application, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import cors from 'cors';
import rootRouter from "./router";
import { errorMiddleware } from "./middlewares/error-middleware";
require('dotenv').config();


const PORT = process.env.PORT || 5000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL
}));
app.use('/api', rootRouter)
app.use(errorMiddleware)

const start = async () => {
   try {
      await connect(process.env.MONGO_DB_URL, {
         
      })
      app.listen(PORT, (): void => {
         console.log(`Connected successfully on port http://localhost:${PORT}/`);
         
         
      });
   } catch (error) {
      console.error(`Error occured: ${error.message}`);
   }
}

start();

