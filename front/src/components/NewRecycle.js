import { useState } from "react";
import { createRecycle } from "../reducers/recycleReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { TextInput, Label, Button, Spinner } from "flowbite-react";
import BlogFooter from "./BlogFooter";

const NewRecycle = (props) => {
  const dispatch = useDispatch();
  console.log("props")
  console.log(props)
  const productToRecycle = props.props;
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const navigate = useNavigate();

  if (productToRecycle === undefined) {
    return <Spinner />;
  }

  const addRecycle = async (event) => {
    event.preventDefault();

    const recycleObject = {
      product: productToRecycle.id, // Use the product ID
      quantity: quantity,
      dateCreated: new Date(),
    };

    try {
      await dispatch(createRecycle(recycleObject));
      const notif1 = {
        message: `Recycling entry for ${productToRecycle.name} added successfully`,
        type: "success",
      };
      dispatch(setNotification(notif1, 2500));
      navigate("/");
    } catch (exception) {
      const notif2 = {
        message: `Cannot add recycling entry for ${productToRecycle.name}`,
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
            <article className="mx-auto w-full max-w-6xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  Recycling {productToRecycle.name}
                </h1>
                <address className="flex items-center mb-6 not-italic"></address>
              </header>
              <div>
                <p>
                  These are the components: {productToRecycle.components}
                </p>
              </div>
              <form onSubmit={addRecycle} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="recycle-quantity" value="Quantity to Recycle" />
                  <TextInput
                    id="recycle-quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={({ target }) => setQuantity(parseInt(target.value))}
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

export default NewRecycle;
