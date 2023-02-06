const express = require("express")
const {
    getAllMemes,
    getOneMeme,
    postMeme,
    patchMeme,
    deleteMeme
} = require("../controllers/memes.controller");
const { checkJwt } = require("../middlewares/checkJwt.middleware");

const router = express.Router()

router
    .get("/", getAllMemes)
    .get("/:id", getOneMeme)
    .post("/",  postMeme)
    .patch("/:id", patchMeme)
    .delete("/:id", deleteMeme)


module.exports = router;