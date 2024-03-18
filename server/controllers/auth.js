const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const login = async (req, res) => {
  const { logInID, password } = req.body;

  if (!logInID || !password) {
    throw new BadRequestError("Please provide all Credentials");
  }

  const user = await User.findOne({ logInID });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ token });
};

const register = async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !email || !password) {
    throw new BadRequestError("Please provide all Credentials");
  }

  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ token });
};

module.exports = { login, register };
