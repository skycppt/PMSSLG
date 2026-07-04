import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Publication Management System API",
      version: "1.0.0",
      description: "Backend API documentation for PMS",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;