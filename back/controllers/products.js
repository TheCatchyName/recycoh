const productRouter = require("express").Router();
const Product = require("../models/product");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const product = require("../models/product");

productRouter.get("/", async (request, response) => {
  const products = await Product.find({}).populate("user", { username: 1, name: 1 });
  response.json(products);
});

productRouter.get("/:id", async (request, response) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    response.json(product.toJSON());
  } else {
    response.status(404).end();
  }
});

productRouter.get('/barcode/:barcode', async (request, response) => {
    const barcode = request.params.barcode;
  
    try {
      const products = await Product.find({ barcode }).populate('user', { username: 1, name: 1 });
  
      if (products.length === 0) {
        return response.status(404).json({ message: 'No products found with that barcode' });
      }
  
      response.json(products);
    } catch (error) {
      response.status(500).json({ error: 'Server Error' });
    }
  });

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};
productRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  console.log("decoded token get")
//   if (!body.likes) {
//     body.likes = 0;
//   }
//   if (!body.comments) {
//     body.comments = [];
//   }
  if (!body.name) {
    return response.status(400).json({
      error: "name is required",
    });
  }
  // TODO missing field handlers (although frontend already handles)

  const user = await User.findById(decodedToken.id);

  const product = new Product({
    name: body.name,
    brand: body.brand,
    category: body.category,
    dateCreated: body.dateCreated,
    barcode: body.barcode,
    // comments: body.comments,
    user: user._id,
    components: body.recyclableComponents
  });
  console.log("product obj created")
  try {
    const savedProduct = await product.save();
    user.products = user.products.concat(savedProduct._id);
    await user.save();
    response.status(201).json(savedProduct);
    console.log("saved")
  } catch (exception) {
    console.log("error saving")
    next(exception);
  }
});

productRouter.delete("/:id", async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const productToDelete = await Product.findById(request.params.id);

  if (user._id.toString() != productToDelete.user._id.toString()) {
    return response.status(401).json({ error: `Unauthorized` });
  }

  try {
    await Product.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

productRouter.put("/:id", async (request, response, next) => {
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

  const product = {
    title: body.title,
    content: body.content,
    dateCreated: body.dateCreated,
    likes: body.likes,
    comments: body.comments,
  };
  try {
    const updatedProduct = await Product.findByIdAndUpdate(request.params.id, product, {
      new: true,
    });
    response.json(updatedProduct.toJSON());
  } catch (exception) {
    next(exception);
  }
});

productRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const product = await Product.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const comment = {
    content: body.content,
    user: user._id,
  };

  product.comments = product.comments.concat(comment);

  const updatedProduct = await product.save();

  updatedProduct
    ? response.status(200).json(updatedProduct.toJSON())
    : response.status(404).end();
});

module.exports = productRouter;
