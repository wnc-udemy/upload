const UUID = require('uuid-v4');
const httpStatus = require('http-status');
const { Storage } = require('@google-cloud/storage');
const ApiError = require('../utils/ApiError');

// Private key fireabase
const keyFilename = './ecommerce-intern-firebase-adminsdk-becnn-10212b7450.json';
// Id project firebase
const projectId = 'ecommerce-intern';
// Place save image
const bucketName = `${projectId}.appspot.com`;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(bucketName);

// get public link in database
const getPublicUrl = (filename, productID, uuid) => {
  // return `https://storage.googleapis.com/${bucketName}/ProductImages/${productID}/${filename}`;
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
    `/ProductImages/${productID}/${filename}`
  )}?alt=media&token=${uuid}`;
};

module.exports.uploadFile = (files, productID) => {
  return new Promise((resolve, reject) => {
    const urls = [];

    if (!files) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'File input not correct');
    }

    files.forEach((file) => {
      // new local file
      const newLocalName = Date.now();
      // create path
      const fileUpload = bucket.file(`/ProductImages/${productID}/${newLocalName}`);
      // upload image
      const uuid = UUID();

      const metadata = {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      };

      const blobStream = fileUpload.createWriteStream({
        metadata,
        resumable: false,
      });

      blobStream.on('error', (error) => {
        reject(error);
      });

      blobStream.on('finish', () => {
        urls.push(getPublicUrl(newLocalName, productID, uuid));

        if (urls.length === files.length) resolve(urls);
      });

      blobStream.end(file.buffer);
    });
  });
};
