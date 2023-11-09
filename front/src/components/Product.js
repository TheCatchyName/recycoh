import { Card } from "flowbite-react";

const Product = ({ product }) => {
  console.log(product);
  if (product === undefined) {
    return null;
  }


  return (
    <Card className="mb-4" href={`/products/${product.id}`}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{product.category} from {product.brand}</p>
      <p className="font-normal text-gray-700 dark:text-gray-400">components go here</p>
    </Card>
  );
};
export default Product;
