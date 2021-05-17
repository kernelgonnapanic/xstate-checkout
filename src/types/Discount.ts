export interface Discount {
  code: string;
  percentage: number;
}

export const availableDiscounts: Discount[] = [
  {
    code: "MAJ_20",
    percentage: 20,
  },
  {
    code: "DLA_NAJLEPSZYCH",
    percentage: 13,
  },
];
