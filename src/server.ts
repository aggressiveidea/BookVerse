import express from "express"
import bookRouter from "./routes/book.router"
import { ErrorHandler } from "./middlewares/errorHandler.middleware"
import { connect } from "./database/db"
import morgan from "morgan"
const app = express()
const PORT = process.env.PORT || 5000

connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use("/api/books", bookRouter)

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" })
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api/books`)
})
