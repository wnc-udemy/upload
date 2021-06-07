const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const uploadFile = catchAsync(async (req, res) => {
  const { files, user } = req;
  const { id: userId } = user;

  if (!files) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File input not correct');
  }

  const result = await uploadService.uploadFile(files, userId);

  if (result.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Upload file fail');
  }

  if (result.length === 1) {
    res.status(httpStatus.CREATED).send({ url: result[0] });
  } else {
    res.status(httpStatus.CREATED).send({ url: result });
  }
});

module.exports = {
  uploadFile,
};
