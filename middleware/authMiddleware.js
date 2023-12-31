import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.email = decoded.email;
    next();
  });
};
