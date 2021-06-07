const express = require('express');
const Multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const videoValidation = require('../../validations/video.validation');
const videoController = require('../../controllers/video.controller');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // no larger than 50mb, you can change as needed.
  },
});

const router = express.Router();

router
  .route('/')
  .post(auth('video.upload'), validate(videoValidation.uploadVideo), multer.array('file'), videoController.uploadFile);

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
 *         schema:
 *           type: string
 *         description: Course id
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Video'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *
 */
