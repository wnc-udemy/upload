const Joi = require('joi');

const uploadImage = {
  FormData: Joi.object().keys({
    file: Joi.binary().required(),
  }),
};

module.exports = {
  uploadImage,
};
