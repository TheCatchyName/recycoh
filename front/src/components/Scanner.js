import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import NewProduct from "./NewProduct";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByBarcode } from "../reducers/productReducer";
import { Button, Spinner } from "flowbite-react";

const Scanner = () => {
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products) || [];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scannedBarcode && scannedBarcode !== "") {
      setIsLoading(true);
      dispatch(fetchProductsByBarcode(scannedBarcode))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [scannedBarcode, dispatch]);

  useEffect(() => {
    if (scannedBarcode !== "" && products.length === 0) {
      setShowNewProductForm(true);
    }
  }, [scannedBarcode, products]);

  const handleCreateNewProduct = () => {
    setShowNewProductForm(true);
  };

  return (
    <div className="dark:bg-gray-800 py-1">
      {scannedBarcode === "" ? (
        <BarcodeScannerComponent
          facingMode="user"
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setScannedBarcode(result.text);
          }}
        />
      ) : (
        <div>
          {isLoading ? (
            <Spinner />
          ) : showNewProductForm ? (
            <NewProduct barcode={scannedBarcode} />
          ) : (
            <>
              {products.length > 0 ? (
                <div className="flex flex-wrap justify-center space-x-4">
                  {products.map((product) => (
                    <div className="dark:bg-gray-800 py-1" key={product.id}>
                      <Product product={product} />
                      <Button href={`/recycle/${product.id}`}> Recycle this product </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <Spinner />
              )}
              <div className="dark:bg-gray-800 py-1 justify-center space-x-4">
                <Button className="mt-4" onClick={handleCreateNewProduct}> Create new product </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Scanner;
