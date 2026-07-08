import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import publicationRoutes from "./routes/publicationRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bookSaleRoutes from "./routes/bookSaleRoutes.js";
import {notFound,errorHandler,} from "./middleware/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import env from "./config/env.js";
import memberRoutes from "./routes/memberRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";


connectDB();
const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    message: {

        success: false,

        message: "Too many requests. Please try again later."

    }

});

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Publication Management System API is running",
    version: "1.0.0",
  });
});
app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pmsslg.vercel.app",
      "https://pmsslg-a0i9ctl66-pmsslg.vercel.app",
      /^https:\/\/.*\.vercel\.app$/,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/publications",publicationRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/subscriptions", subscriptionRoutes );
app.use("/api/payments", paymentRoutes);
app.use("/api/book-sales", bookSaleRoutes);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/reports",reportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`server running on port no ${PORT}`);
});