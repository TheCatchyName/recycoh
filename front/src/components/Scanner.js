import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import NewProduct from "./NewProduct";
const Scanner = () => {
    const [data, setData] = React.useState("Not Found");
    return (
        <div>
            <div className="dark:bg-gray-800 py-1">
                <>
                    <BarcodeScannerComponent
                        width={500}
                        height={500}
                        onUpdate={(err, result) => {
                            if (result) setData(result.text);
                            else setData("Not Found");
                        }}
                    />
                    <p>{data}</p>
                </>
            </div>
            <div className="dark:bg-gray-500 py-1">
                <NewProduct></NewProduct>
            </div>
        </div>
    );
};

export default Scanner;