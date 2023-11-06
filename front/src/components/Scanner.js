import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import NewProduct from "./NewProduct";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByBarcode } from "../reducers/productReducer";

const Scanner = () => {
  const [scannedBarcode, setScannedBarcode] = useState("");
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

  return (
    <div className="dark:bg-gray-800 py-1">
      {scannedBarcode === "" ? (
        <BarcodeScannerComponent
          facingMode="user" // or environment for rear camera
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setScannedBarcode(result.text);
          }}
        />
      ) : (
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {products.length > 0 ? (
                products.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              ) : <NewProduct barcode={scannedBarcode} />}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Scanner;