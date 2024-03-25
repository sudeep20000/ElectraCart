const product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllProducts = async (_, res) => {
  const products = await product.find({});
  res.status(StatusCodes.OK).json({ products });
};

module.exports = { getAllProducts };
