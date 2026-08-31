import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import ErrorMiddleWare from "./middleware/ErrorMiddleWare.middleware.js";
// import userRouter from './router/user.route.js';
import authRouter from "./router/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.route.js";
import adminRoute from "./router/admin.route.js";
// import {passport} from "./config/passport.js"
import profileRouter from "./router/profile.route.js";
import WeatherRouter from "./router/weather.router.js";


dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5173"];
const allowReadonlyOrigins = ["*"];

const corsOptions = (req, cb) => {
  const origin = req.header("origin");

  if (!origin) {
    cb(null, {
      origin: true,
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  }

  if (allowedOrigins.includes(origin)) {
    return cb(null, {
      origin: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  }

  if (allowReadonlyOrigins.includes(origin)) {
    return cb(null, {
      origin: true,
      methods: ["GET"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  }
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  legacyHeaders: false,
  standardHeaders: true,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
    });
  },
});

app.use(limiter);

app.use(express.json());
app.use(cookieParser());

//using the passport middleware
// app.use(passport.initialize())

// app.use('/api/v1/users', userRouter)

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile" , profileRouter)
app.use("/api/v1/weather", WeatherRouter)


app.use(ErrorMiddleWare);

export default app;
