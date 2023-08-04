const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your Express.js app",
    },
    servers: [
      {
        url: "https://schoolapi-op58.onrender.com/",
        // change this to http://localhost:3000 when running on local host
      },
    ],
  },
  apis: ["./routes/*.js"], // Point to your route files
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
};
