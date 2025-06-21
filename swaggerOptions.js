// swaggerOptions.js
function getServerUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}://${window.location.host}`;
  } else {
    // Return a default URL or throw an error
    return 'http://localhost:2000';
  }
}
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
        url: getServerUrl(), 
        // change if needed
      },
      // { url: 'https://backend-jfoi8mk40-white12381s-projects.vercel.app'}
    ],
  },
  apis: ['./routes/*.js'], // adjust the path to your route files
};
