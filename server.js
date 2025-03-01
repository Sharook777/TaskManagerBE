import * as dotEnv from "dotenv";
import express from "express";
import cors from "cors";
import logger from "morgan";

import initiateMongoDb from "./db.js";
import apiRouter from "./src/router.js";

const app = express();

dotEnv.config();

const PORT = process.env.PORT;
const CORS_ORIGN = { origin: "http://localhost:3000/" };

initiateMongoDb();

app.use(express.json());
app.use(cors());
app.use(logger("dev")); //"combined"

app.get("/", (_, res) => {
  res.send("Hello, Express!");
});

app.use("/api/", apiRouter);
app.options("*", cors(CORS_ORIGN));
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
