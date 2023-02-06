require("dotenv").config()

// DB connection
const PORT           = process.env.PORT || 4000
const DB             = process.env.MONGO_URI 
const DB_TEST        = process.env.MONGO_URI_TEST 

// Auth0
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE
const AUTH0_ISSUER   = process.env.AUTH0_ISSUER

// Front page
const APP_ORIGIN     = process.env.APP_ORIGIN

// S3 Bucket
const AWS_BUCKET_NAME   = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_ARN           = process.env.AWS_ARN
const AWS_ACCESS_KEY    = process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY    = process.env.AWS_SECRET_KEY

module.exports = {
    PORT,
    DB: DB_TEST,
    AUTH0_AUDIENCE,
    AUTH0_ISSUER,
    APP_ORIGIN,
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION,
    AWS_ARN,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY
}