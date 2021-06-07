const express = require('express');
const auth = require('../../middlewares/auth');
const Multer = require('multer');
const validate = require('../../middlewares/validate');
const videoValidation = require('../../validations/video.validation');
const videoController = require('../../controllers/video.controller');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const router = express.Router();

router
  .route('/')
  .post(auth('video.upload'), validate(videoValidation.uploadVideo), multer.array('subImage'), videoController.uploadVideo)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management and retrieval
 */

/**
 * @swagger
 * /videos:
 *   post:
 *     summary: upload a video 
 *     description: user can upload owner video.
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: course
 *         require: true
 *         schema:
 *           type: string
 *         description: Course id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: fake binary url
 *     responses:
 *       "201":
 *         description: Uploaded
 *         content:
 *           application/json:
 *             schema:
 *             type: string
 *             example:
 *               url: fake binary url
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 * 
 */