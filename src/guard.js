import jwt from "jsonwebtoken";

const routerGuard = (req, res, next) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;

  const token = req?.headers?.authorization;
  if (!token) {
    return res.status(401).send({ sucess: false, message: "Missing Token" });
  }

  try {
    const decoded = jwt.decode(token, TOKEN_SECRET);

    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      throw Error;
    }
  } catch (err) {
    return res.status(401).send({ sucess: false, message: "Invalid Token" });
  }
};

export default routerGuard;
