import express from "express";

import authRouter from "./auth/router.js";
import appRouter from "./app/router.js";
import routerGuard from "./guard.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/app", routerGuard, appRouter);

export default apiRouter;
