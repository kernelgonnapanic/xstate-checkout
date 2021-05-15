import { Product } from "../types/Product";

export const getProducts = (): Product[] => {
  return [
    {
      id: "1",
      name: "Buty sportowe",
      manufacturer: "Adidas",
      price: 2500,
    },
    {
      id: "2",
      name: "Koszulka sportowa",
      manufacturer: "Nike",
      price: 5000,
    },
    {
      id: "3",
      name: "Spodnie dresowe",
      manufacturer: "Reebok",
      price: 8900,
    },
  ];
};

export const findProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find((elem) => elem.id === id);
};
