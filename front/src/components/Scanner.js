import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import NewProduct from "./NewProduct";
const Scanner = () => {
    const [scannedBarcode, setScannedBarcode] = React.useState("");
    return (
        <div>
            <div className="dark:bg-gray-800 py-1">

            {scannedBarcode === "" && 
                <BarcodeScannerComponent
                    width={500}
                    height={500}
                    onUpdate={(err, result) => {
                        if (result) setScannedBarcode(result.text);
                    }}
                />}
            
            {scannedBarcode && <NewProduct barcode={scannedBarcode} ></NewProduct>}
            </div>
        </div>
    );
};

export default Scanner;