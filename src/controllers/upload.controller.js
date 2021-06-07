const httpStatus = require('http-status');
const rp = require('request-promise');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const uploadFile = catchAsync(async (req, res) => {
  const { files, user } = req;
  const { course: courseId } = req.query;
  const { id: userId } = user;

  const course = JSON.parse(
    await rp.get({
      url: `${config.urlBackend}courses/${courseId}?type=8`,
    })
  );

  if (!files) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File input not correct');
  }

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }

  if (course.instructor.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This user was not instructor of course');
  }

  const url = await uploadService.uploadFile(files, courseId);

  res.status(httpStatus.CREATED).send({ url });
});

module.exports = {
  uploadFile,
};
