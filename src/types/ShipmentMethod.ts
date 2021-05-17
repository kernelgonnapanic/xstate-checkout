export interface ShipmentMethod {
  type: string;
  price: number;
  name: string;
  freeFrom: number;
}

export const shipmentMethods: ShipmentMethod[] = [
  {
    type: "expressDelivery",
    name: "Dostawa ekspresowa (1-2 dni)",
    price: 2500,
    freeFrom: Infinity,
  },
  {
    type: "standardDelivery",
    name: "Dostawa standardowa (3-4 dni)",
    price: 1000,
    freeFrom: 20000,
  },
];
