const Joi = require('joi');
const { objectId } = require('./custom.validation');

const uploadImage = {
  FormData: Joi.object().keys({
    file: Joi.binary().required(),
  }),
  query: Joi.object().keys({
    course: Joi.string().custom(objectId),
  }),
};

module.exports = {
  uploadImage,
};
