const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    autoHeaders: true,
    autoQuery: true,
    autoBody: true
  });
  
  const outputFile = './swagger-output.json';
  const endpointsFiles = [
    './routes/authRoutes.js',
    './routes/courseRoutes.js',
    './routes/enrollmentRoutes.js',
    './routes/adminRoutes.js'
  ];
  
  const doc = {
    info: {
      title: 'EdTech API',
      description: 'API for educational platform',
      version: '1.0.0'
    },
    host: `localhost:${process.env.PORT || 5030}`,
    basePath: '/api', // This matches your route prefix
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    definitions: {
      User: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['username', 'email', 'password']
      }
    }
  };
  
  swaggerAutogen(outputFile, endpointsFiles, doc);