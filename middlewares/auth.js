const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { SECRET_KEY } = process.env;
const { User } = require("../service/schemas/user");

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      const err = createError(401, "Not authorized ");
      throw err;
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      const err = createError(401, "Not authorized");
      throw err;
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = { auth };
