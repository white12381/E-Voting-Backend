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


app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs); // or whatever variable holds your swaggerJsdoc result
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            SwaggerUIBundle({
              url: '/swagger.json',
              dom_id: '#swagger-ui',
            });
          };
        </script>
      </body>
    </html>
  `);
});



mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  });
});

export default app;