import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { updateProduct, deleteProduct } from "../reducers/productReducer";
import { Card } from "flowbite-react";

const Product = ({ product }) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(product);
  if (product === undefined) {
    return null;
  }

  const handleUpdateProduct = async (productObject) => {
    try {
      await dispatch(updateProduct(productObject));
    } catch (error) {
      const notif = {
        message: error.response.data.error,
        type: "error",
      };
      dispatch(setNotification(notif, 2500));
    }
  };
  const handleDeleteProduct = async (id) => {
    const product1 = products.filter((b) => b.id === id);
    const name = product1[0].name;
    if (window.confirm(`Do you want to delete ${name}?`)) {
      try {
        await dispatch(deleteProduct(id));
        const notif = {
          message: "Successfully deleted",
          type: "success",
        };
        dispatch(setNotification(notif, 2500));
      } catch (error) {
        const notif = {
          message: error.message,
          type: "error",
        };
        dispatch(setNotification(notif, 2500));
      }
    }
  };

  return (
    //TODO: Make the link here click into adding a new recycling entry
    <Card className="mb-4" href={`/products/${product.id}`}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product.brand} - {product.name} {product.category}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">components go here</p>
    </Card>
  );
};
export default Product;
