const cart = require("../models/cart");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getCartData = async (req, res) => {
  const cartItem = await cart.find({ addBy: req.user.userId });
  if (!cartItem) throw new BadRequestError("no item present");
  res.status(StatusCodes.CREATED).json({ cartItem });
};

const addToCart = async (req, res) => {
  const {
    about,
    available,
    brand,
    color,
    features,
    images,
    model,
    price,
    rating,
    reviews,
    type,
  } = req.body;

  const itemCount = await cart.find({ model });
  if (itemCount.length > 8)
    throw new BadRequestError(
      `exceeded maximum quantity limit for item: ${brand} ${model}`
    );

  req.body.addBy = req.user.userId;
  const item = await cart.create({ ...req.body });
  if (!item) throw new BadRequestError("fail to add");
  res.status(StatusCodes.CREATED).json({ itemName: item.model });
};

module.exports = { addToCart, getCartData };
