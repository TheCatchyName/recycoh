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
  const [isNoProductFound, setIsNoProductFound] = useState(false);

  useEffect(() => {
    setIsNoProductFound(products.length === 0 && scannedBarcode !== "");
  }, [products, scannedBarcode]);

  useEffect(() => {
    // Perform checks inside a separate useEffect to monitor changes in scannedBarcode
    if (scannedBarcode && scannedBarcode !== "") {
      dispatch(fetchProductsByBarcode(scannedBarcode));
    }
  }, [scannedBarcode, dispatch]);

  const handleBarcodeScan = (err, result) => {
    if (result) {
      setScannedBarcode(result.text);
    }
  };

  return (
    <div className="dark:bg-gray-800 py-1">
      {scannedBarcode === "" ? (
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={handleBarcodeScan}
        />
      ) : (
        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          ) : isNoProductFound ? (
            <NewProduct barcode={scannedBarcode} />
          ) : (
            <p>Loading...</p> // Show loading indicator or handle loading state
          )}
        </div>
      )}
    </div>
  );
};

export default Scanner;