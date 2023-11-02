import { useState } from "react";
import { createProduct } from "../reducers/productReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { TextInput, Label, Button, Textarea } from "flowbite-react";
import BlogFooter from "./BlogFooter";

const NewProduct = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newBarcode, setNewBarcode] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const navigate = useNavigate();

  const addProduct = (event) => {
    event.preventDefault();
    const productObject = {
      name: newName,
      brand: newBrand,
      category: newCategory,
      dateCreated: new Date(),
      barcode: newBarcode,
    };
    addNewProduct(productObject);
    setNewBrand("");
    setNewName("");
    setNewBarcode("");
    setNewCategory("");
  };

  const addNewProduct = async (productObject) => {
    try {
      const notif1 = {
        message: `Product was successfully added`,
        type: "success",
      };
      await dispatch(createProduct(productObject));
      navigate("/");

      dispatch(setNotification(notif1, 2500));
    } catch (exception) {
      const notif2 = {
        message: `Cannot add product`,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };

  return (
    <>
      <div className="">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-12 bg-white dark:bg-gray-900 min-h-screen">
          <div className="flex justify-between px-4 mx-auto max-w-6xl ">
            <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  Create a Product
                </h1>
                <address className="flex items-center mb-6 not-italic"></address>
              </header>
              <form onSubmit={addProduct} className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="product-name" value="Name of Product" />
                  </div>
                  <TextInput
                    id="product-name"
                    type="text"
                    placeholder="An Amazing Product"
                    required={true}
                    value={newName}
                    onChange={({ target }) => setNewName(target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="product-brand" value="Brand of Product" />
                  </div>
                  <Textarea
                    required={true}
                    value={newBrand}
                    placeholder="Brand name"
                    onChange={({ target }) => setNewBrand(target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="product-barcode" value="Product Barcode" />
                  </div>
                  <Textarea
                    required={true}
                    value={newBarcode}
                    placeholder="Barcode number"
                    onChange={({ target }) => setNewBarcode(target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="product-category" value="Product Category" />
                  </div>
                  <Textarea
                    required={true}
                    value={newCategory}
                    placeholder="Category"
                    onChange={({ target }) => setNewCategory(target.value)}
                  />
                </div>

                <Button className="mt-4 w-24" type="submit">
                  Submit
                </Button>
              </form>
            </article>
          </div>
        </main>
      </div>

      <BlogFooter />
    </>
  );
};

export default NewProduct;
