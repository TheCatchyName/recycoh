const recycleRouter = require("express").Router();
const Product = require("../models/recycle");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const recycle = require("../models/recycle");

recycleRouter.get("/", async (request, response) => {
  const recycles = await Product.find({}).populate("user", { username: 1, name: 1 });
  response.json(recycles);
});

recycleRouter.get("/:id", async (request, response) => {
  const recycle = await Product.findById(request.params.id);
  if (recycle) {
    response.json(recycle.toJSON());
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};
recycleRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  console.log("decoded token get")

  const user = await User.findById(decodedToken.id);

  const recycle = new Product({
    dateCreated: body.dateCreated,
    user: user._id,
    product: body.product,
    quantity: body.quantity
  });
  console.log("recycle obj created")
  try {
    const savedProduct = await recycle.save();
    user.recycles = user.recycles.concat(savedProduct._id);
    await user.save();
    response.status(201).json(savedProduct);
    console.log("saved")
  } catch (exception) {
    console.log("error saving")
    next(exception);
  }
});

recycleRouter.delete("/:id", async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const recycleToDelete = await Product.findById(request.params.id);

  if (user._id.toString() != recycleToDelete.user._id.toString()) {
    return response.status(401).json({ error: `Unauthorized` });
  }

  try {
    await Product.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

recycleRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (!body.likes) {
    body.likes = 0;
  }
  if (!body.title) {
    return response.status(400).json({
      error: "title is required",
    });
  }

  const recycle = {
    dateCreated: body.dateCreated,
    quantity: body.quantity,
  };
  try {
    const updatedProduct = await Product.findByIdAndUpdate(request.params.id, recycle, {
      new: true,
    });
    response.json(updatedProduct.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = recycleRouter;
