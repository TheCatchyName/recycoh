const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({})
  .populate("blogs", "title content dateCreated likes tag PID")
  .populate("products", "name brand category dateCreated barcode components")
  .populate({
    path: "recycles",
    select: "dateCreated quantity product",
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const checkUsername = (obj) => obj.username === username;

  if (!username) {
    return response.status(400).json({
      error: "username is required",
    });
  }
  if (!password) {
    return response.status(400).json({
      error: "password is required",
    });
  }
  const condt = await User.find({});
  if (condt.some(checkUsername)) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
