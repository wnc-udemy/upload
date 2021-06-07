const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const uploadVideo = catchAsync(async (req, res) => {
  const { files } = req;
  const { courseId } = req.query;


  const url = await uploadService.uploadFile(files, courseId);

  res.status(httpStatus.CREATED).send(url);
});

module.exports = {
  uploadVideo,
};
