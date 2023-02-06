const express = require("express")
const {
    getAllTags,
    postTag
} = require("../controllers/tags.controller");
const { checkJwt } = require("../middlewares/checkJwt.middleware");

const router = express.Router()

router
    .get("/", getAllTags)
    .post("/",  postTag)

module.exports = router;