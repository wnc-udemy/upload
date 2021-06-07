const express = require('express');
const Multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const imageValidation = require('../../validations/image.validation');
const imageController = require('../../controllers/image.controller');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const router = express.Router();

router
  .route('/')
  .post(auth('image.create'), validate(imageValidation.uploadImage), multer.array('subImage'), imageController.uploadImage)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image management and retrieval
 */

/**
 * @swagger
 * /image:
 *   post:
 *     summary: upload a image
 *     description: user can upload owner image.
 *     tags: [Images]
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
 *               name: fake name
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
 */
