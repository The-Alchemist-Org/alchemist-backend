import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import $RefParser from '@readme/json-schema-ref-parser';
import logger from '@services/logger';

const apiDocs = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.{json,yml}', './build/domains/**/*.{js,ts}'],
});

export default (app: Application) => {
  const swaggerJsonUrl = '/api-docs/swagger.json';
  const options = {
    explorer: true,
    swaggerOptions: {
      url: swaggerJsonUrl,
    },
  }

  app.get(swaggerJsonUrl, async (req, res) => {
    try {
      const dereferencedSchema = await $RefParser.dereference(apiDocs);
      res.json(dereferencedSchema);
    } catch (e) {
      logger.error(e);
      res.json(apiDocs);
    }
  });

  app.use(
    '/api-docs',
    swaggerUi.serveFiles(null, options),
    swaggerUi.setup(null, options),
  );
};
