const Joi = require('joi');
const { objectId } = require('./custom.validation');

const uploadImage = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
  query: Joi.object().keys({
    course: Joi.string().custom(objectId),
  }),
};

module.exports = {
  uploadImage,
};
