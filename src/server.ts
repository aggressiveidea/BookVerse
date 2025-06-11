import express from "express"
import bookRouter from "./routes/book.router"
import authRouter from "./routes/auth.router"
import { connect } from "./database/db"
import morgan from "morgan"

const app = express()
const PORT = process.env.PORT || 5000

connect().catch((error) => {
  console.error("Failed to connect to database:", error.message)
  process.exit(1)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use("/api/books", bookRouter)
app.use("/api/auth", authRouter) 

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Books API available at http://localhost:${PORT}/api/books`)
  console.log(`Auth API available at http://localhost:${PORT}/api/auth`)
})
