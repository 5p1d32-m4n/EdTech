const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/authRoutes.js', './routes/courseRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles);