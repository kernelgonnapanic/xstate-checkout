import { getProducts } from "../mocks/getProducts";
import { ProductElement } from "../molecules/ProductElement";

export const Products = (): JSX.Element => {
  const products = getProducts();

  return (
    <div>
      {products.map((prod) => {
        return <ProductElement key={prod.id} product={prod} />;
      })}
    </div>
  );
};
