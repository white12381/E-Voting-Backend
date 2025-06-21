// swaggerOptions.js
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voting Application',
      version: '1.0.0',
      description: ' Decision Voting App',
    },
     components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, just a hint
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:4000', 
        // change if needed
      },
      { url: 'https://e-voting-beta-one.vercel.app'}
    ],
  },
  apis: ['./routes/*.js'], // adjust the path to your route files
};
