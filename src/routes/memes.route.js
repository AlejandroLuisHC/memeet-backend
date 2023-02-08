const express = require("express")
const {
    getAllMemes,
    getOneMeme,
    postMeme,
    patchMeme,
    deleteMeme,
    searchMemes
} = require("../controllers/memes.controller");
const { checkJwt } = require("../middlewares/checkJwt.middleware");

const router = express.Router()

router
    .get("/",                 getAllMemes)
    .get("/:id",              getOneMeme)
    .get("/search/:query",    searchMemes)
    .post("/",      checkJwt, postMeme)
    .patch("/:id",  checkJwt, patchMeme)
    .delete("/:id", checkJwt, deleteMeme)


module.exports = router;