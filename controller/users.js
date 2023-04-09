const { User } = require("../service/schemas/user.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs/promises");
const gravatar = require("gravatar");
dotenv.config();
const { SECRET_KEY } = process.env;
const createError = require("http-errors");
const path = require("path");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;

  try {
    const avatarURL = gravatar.url(email);

    const user = await User.findOne({ email });
    if (user) {
      const err = createError(409, "Email in use");
      throw err;
    }

    const newUser = new User({ email, subscription, avatarURL });
    newUser.setPassword(password);
    newUser.save();

    res.json({
      status: "Created",
      code: 201,
      user: { email, subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.checkPassword(password)) {
      const err = createError(401, "Email or password is wrong");
      throw err;
    }
    const { subscription } = user;

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      user: { email, subscription },
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    if (!user) {
      const err = createError(401, "Not authorized");
      throw err;
    }

    res.json({
      status: "success",
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: null });
    if (!user) {
      const err = createError(401, "Not authorized");
      throw err;
    }

    res.json({
      status: "No content",
      code: 204,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;

    const data = await User.findByIdAndUpdate(
      { _id },
      { subscription },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      result: {
        data,
      },
    });
    if (!data) {
      const err = createError(404, "Not found");

      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const { path: tempDir } = req.file;
  const { _id } = req.user;
  const avatarURL = path.join(avatarsDir, `${uuidv4()}.jpeg`);
  try {
    const image = await Jimp.read(tempDir);
    image.resize(250, 250).write(avatarURL);

    const data = await User.findByIdAndUpdate(
      { _id },
      { avatarURL },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      result: {
        data,
      },
    });
  } catch (error) {
    await fs.unlink(tempDir);
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
