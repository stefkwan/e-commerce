const GoogleCloudBucket = require('@google-cloud/storage');
const Storage = GoogleCloudBucket.Storage;

const GOOGLE_CLOUD_PROJECT_ID = bash.bashrc.GCS_PROJECT_ID; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = bash.bashrc.GCS_KEYFILE_PATH; // Replace with the path to the downloaded private key

const storage = new Storage({
	projectId: GOOGLE_CLOUD_PROJECT_ID,
	keyFilename: GOOGLE_CLOUD_KEYFILE,
});

exports.storage = storage

/**
* Get public URL of a file. The file must have public access
* @param {string} bucketName
* @param {string} fileName
* @return {string}
*/
exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

 /**
   * Copy file from local to a GCS bucket.
   * Uploaded file will be made publicly accessible.
   *
   * @param {string} localFilePath
   * @param {string} bucketName
   * @param {Object} [options]
   * @return {Promise.<string>} - The public URL of the uploaded file.
   */
exports.copyFileToGCS = (localFilePath, bucketName, options) => {
options = options || {};

const bucket = storage.bucket(bucketName);
const fileName = path.basename(localFilePath);
const file = bucket.file(fileName);

return bucket.upload(localFilePath, options)
  .then(() => file.makePublic())
  .then(() => exports.getPublicUrl(bucketName, gcsName));
};