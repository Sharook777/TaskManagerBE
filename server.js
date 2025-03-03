import * as dotEnv from "dotenv";
import express from "express";
import cors from "cors";
import logger from "morgan";

import initiateMongoDb from "./db.js";
import apiRouter from "./src/router.js";

const app = express();

dotEnv.config();

const PORT = process.env.PORT;
const allowedOrigins = process.env.CORS_ORIGINS.split(",");

initiateMongoDb();

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(logger("combined"));

app.get("/", (_, res) => {
  res.send("Hello, Express!");
});

app.use("/api/", apiRouter);
app.use(express.urlencoded({ extended: true }));
app.get("*", function (_, res) {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error::==>> ", err);
  }
  console.log("listening on port " + PORT);
});
