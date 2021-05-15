export interface Discount {
  code: string;
  percentage: number;
}

export const availableDiscounts: Discount[] = [
  {
    code: "Maj20",
    percentage: 20,
  },
  {
    code: "WielkaPromocja",
    percentage: 40,
  },
];
