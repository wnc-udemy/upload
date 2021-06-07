const express = require('express');
const Multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const imageValidation = require('../../validations/image.validation');
const imageController = require('../../controllers/image.controller');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // no larger than 1mb, you can change as needed.
  },
});

const router = express.Router();

router
  .route('/')
  .post(auth('image.upload'), validate(imageValidation.uploadImage), multer.array('file'), imageController.uploadFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image management and retrieval
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: upload a image
 *     description: user can upload owner image.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
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
 *                $ref: '#/components/schemas/Image'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */
