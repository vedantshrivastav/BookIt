import express from "express";
import { connectDB } from "./db/config";
import router from "./routes/route";
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors({
  origin: ["https://book-it-pink.vercel.app/"], // or "*" for testing
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
//Routes
app.use("/api/experiences",router)
const PORT = 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}



startServer();
