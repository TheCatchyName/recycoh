import { useState } from "react";
import { createProduct } from "../reducers/productReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { TextInput, Label, Button, Textarea } from "flowbite-react";
import BlogFooter from "./BlogFooter";

const NewProduct = (props) => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
//   const [newBarcode, setNewBarcode] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [recyclableComponents, setRecyclableComponents] = useState([]);

  const navigate = useNavigate();

  const addProduct = (event) => {
    event.preventDefault();
    const productObject = {
      name: newName,
      brand: newBrand,
      category: newCategory,
      dateCreated: new Date(),
      barcode: props.barcode,
      recyclableComponents: recyclableComponents, // Add selected recyclable components to productObject
    };
    addNewProduct(productObject);
    setNewBrand("");
    setNewName("");
    // setNewBarcode("");
    setNewCategory("");
    setRecyclableComponents([]); // Clear the selected recyclable components
  };

  const addNewProduct = async (productObject) => {
    try {
      const notif1 = {
        message: `Product was successfully added`,
        type: "success",
      };
      const newProduct = await dispatch(createProduct(productObject));
      navigate(`/recycle/${newProduct.id}`);

      dispatch(setNotification(notif1, 2500));
    } catch (exception) {
      const notif2 = {
        message: `Cannot add product`,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };

  // Options for recyclable components
  const recyclableOptions = [
    "PET Plastic Bottle",
    "Aluminium Can",
    "Aluminium Can Tab",
    "Plastic Bottle Cap",
  ];

  const handleCheckboxChange = (e) => {
    const selectedComponent = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // If checked, add the selected recyclable component
      setRecyclableComponents([...recyclableComponents, selectedComponent]);
    } else {
      // If unchecked, remove the selected recyclable component
      setRecyclableComponents(
        recyclableComponents.filter(
          (component) => component !== selectedComponent
        )
      );
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
                    value={props.barcode}
                    placeholder="Barcode number"
                    // onChange={({ target }) => setNewBarcode(target.value)}
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
                <div>
                  <p>Select recyclable components:</p>
                  {recyclableOptions.map((option, index) => (
                    <label key={index} className="block">
                      <input
                        type="checkbox"
                        value={option}
                        checked={recyclableComponents.includes(option)}
                        onChange={handleCheckboxChange}
                      />
                      {option}
                    </label>
                  ))}
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
