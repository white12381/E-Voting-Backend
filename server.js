import express from "express"
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './swaggerOptions.js'; // if separated
import userRoute from "./routes/userRoute.js";
import cors from "cors"
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import votingRoute from "./routes/votingRoute.js";
const app = express()
import path from "path";
import { fileURLToPath } from "url"; 

configDotenv()
app.use((req, res, next) => {
  console.log(`req path is ${req.path} and req type is ${req.method}`);
  next();
});

app.use(express.json());
app.use(cors());

const specs = swaggerJsdoc(swaggerOptions); 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or use specific origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
app.use('/api/user', userRoute)
app.use('/api/voting', votingRoute);

// app.use('/', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));
app.use("/", swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
  customJs:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
    

}));



mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  });
});

export default app;