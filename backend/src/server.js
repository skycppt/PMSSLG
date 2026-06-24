import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import publicationRoutes from "./routes/publicationRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/publications",publicationRoutes);

// app.get("/create-user", async (req, res) => {
//   try {
//     const user = await User.create({
//       fullName: "Sujit Kumar",
//       email: "sujit@gmail.com",
//       password: "123456",
//     });

//     res.json(user);
//   } catch (error) {
//     console.log(error);
//     res.json(error.message);
//   }
// });

app.get("/",(req,res)=>{
  res.send("Publication managment system API Running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`server running on port no ${PORT}`);
});