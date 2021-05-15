import * as React from "react";
import { getProducts } from "../../../mocks/getProducts";
import { ProductElement } from "./ProductElement";

export const Products = () => {
  const products = getProducts();

  return (
    <div>
      {products.map((prod) => {
        return <ProductElement key={prod.id} product={prod} />;
      })}
    </div>
  );
};
