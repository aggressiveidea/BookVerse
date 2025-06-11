import express from "express"
import bookRouter from "./routes/book.router"
import authRouter from "./routes/auth.router"
import adminRouter from './routes/admin.router'
import { connect } from "./database/db"
import morgan from "morgan"

const app = express()
const PORT = process.env.PORT 

connect().catch((error) => {
  console.error("failed to connect to database:", error.message)
  process.exit(1)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use("/api/books", bookRouter)
app.use("/api/auth", authRouter) 
app.use("/api/user", adminRouter) 

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`books API available at http://localhost:${PORT}/api/books`)
  console.log(`auth API available at http://localhost:${PORT}/api/auth`)
  console.log(`user API available at http://localhost:${PORT}/api/user`)
})
