import { TextInput, Label, Button, Textarea } from "flowbite-react";
import BlogFooter from "./BlogFooter";

const ExistingProduct = (props) => {

    // TODO getall products that have this barcode, 
    // then ccreate a selector for each in html for a new recycle entry
    // TODO create new recycle entry, tie it to user

  return (
    <>
      <div className="">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-12 bg-white dark:bg-gray-900 min-h-screen">
          <div className="flex justify-between px-4 mx-auto max-w-6xl ">
            <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  Find existing product
                </h1>
                <address className="flex items-center mb-6 not-italic"></address>
              </header>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="product-barcode" value="Product Barcode" />
                  </div>
                  <Textarea
                    required={true}
                    value={props.barcode}
                    placeholder="Barcode number"
                  />
                </div>
            </article>
          </div>
        </main>
      </div>

      <BlogFooter />
    </>
  );
};

export default ExistingProduct;
