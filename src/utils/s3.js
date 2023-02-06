require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const {
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
} = require("../config/config")

const s3 = new S3({
    region: AWS_BUCKET_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
});

// UPLOAD FILE TO S3
function uploadFile(path, name) {
    const fileStream = fs.createReadStream(path);
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Body: fileStream,
        Key: `memes/${Date.now()}_${name}`,
    };

    return s3.upload(uploadParams).promise(); // this will upload file to S3
}
// DELETE FILE FROM S3
function deleteFile(key) {
    const deleteParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: key,
    };
    return s3.deleteObject(deleteParams).promise(); // this will upload file to S3
}

module.exports = {
    uploadFile,
    deleteFile
};