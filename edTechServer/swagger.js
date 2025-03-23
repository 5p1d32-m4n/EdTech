const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const config = require("./config/config");

const host = config.APP_HOST;
const port = config.PORT;

const swaggerOptions = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'EdTech API',
            version: '1.0.0',
            description: 'API for managing courses, users & enrollments.'
        },
        servers: [
            {
                url: `${host}:${port}`, // config host & port
                description: 'Local server',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],   
    },
    apis: ['./routes/*.js'] // path to route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
module.exports = (app) => {
    // Sever Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}