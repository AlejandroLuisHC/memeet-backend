const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const fileUpload = require("express-fileupload")
const { connectDB } = require("./utils/mongoose")
const {
    PORT,
    DB,
    APP_ORIGIN
} = require("./config/config")

// Middlewares
app.use(cors({ origin: APP_ORIGIN }))
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/assets/tmp',
}))

// Connection to DB
connectDB(app, PORT, DB)

// Routes
const { tagsRouter } = require("./routes")
app.use("/api/tags", tagsRouter)

const { usersRouter } = require("./routes")
app.use("/api/users", usersRouter)

const { memesRouter } = require("./routes")
app.use("/api/memes", memesRouter)

module.exports = { app }