const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  componentName: String,
  componentMaterial: String
});
componentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
//   category: String,
  dateCreated: Date,
  barcode: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
//   components: [componentSchema]
});
productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Product", productSchema);
