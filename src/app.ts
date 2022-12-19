import express, { Express } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

//error controller
import { globalErrorHandler } from "./controller/error.controller";

//Routes
import { usersRouter } from "./routes/users.routes";

import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(compression());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else if (process.env.NODE_ENV === "production") app.use(morgan("combined"));

app.use("/api/v1/users", usersRouter);

//catch errors
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

const PORT: number = 4000;

app.listen(PORT, () => {
  console.log(`Express app running! in port ${PORT}`);
});
