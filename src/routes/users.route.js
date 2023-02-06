const express = require("express")
const {
    getAllUsers,
    getOneUser,
    postUser,
    patchUser,
    deleteUser
} = require("../controllers/users.controller");
const { checkJwt } = require("../middlewares/checkJwt.middleware");

const router = express.Router()

router
    .get("/", getAllUsers)
    .get("/:id", getOneUser)
    .post("/",  postUser)
    .patch("/:id", patchUser)
    .delete("/:id", deleteUser)


module.exports = router;