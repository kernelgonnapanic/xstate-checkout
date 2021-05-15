import checkoutMachine from ".";

export const getSum = (state: typeof checkoutMachine) => 
  state.context.cart.reduce((sum, elem) => sum + elem.price * elem.quantity, 0);
  
export const getDiscounts = (state: typeof checkoutMachine) => {
  const discount = state.context.appliedDiscount?.percentage ?? 0;
  const sum = state.context.cart.reduce((sum, elem) => sum + elem.price * elem.quantity, 0);
  return sum * discount / 100;
}

export const getDiscountedSum = (state: typeof checkoutMachine) => {
  const productsTotal = getSum(state);
  const discounts = getDiscounts(state);
  return productsTotal - discounts;
}

export const getTotal = (state: typeof checkoutMachine) => {
  const discountedSum = getDiscountedSum(state);
  const shippingMethod = state.context.shippmentMethod;
  const freeThreshold = shippingMethod?.freeFrom ?? Infinity;
  const shipping = shippingMethod?.price ?? 0;
  return discountedSum + (discountedSum < freeThreshold ? shipping : 0);
}