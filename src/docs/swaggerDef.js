const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.10',
  info: {
    title: 'Udemy API documentation',
    version,
    license: {
      name: 'Lotus Team',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
    {
      url: `https://wnc-upload.farmhub.asia/v1`,
    },
  ],
};

module.exports = swaggerDef;
