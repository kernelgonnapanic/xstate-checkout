import { assign, createMachine } from "xstate";
import { findProductById } from "../mocks/getProducts";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type Countries = "PL" | "US";

interface Address {
  street: string;
  city: string;
  country: Countries;
}

interface ShippmentMethod {
  type: string;
  price: number;
  name: string;
  freeFrom: number;
}

export const shippmentMethods : ShippmentMethod[] = [{
  type: 'expressDelivery',
  name: 'Dostawa ekspresowa (1-2 dni)',
  price: 2500,
  freeFrom: Infinity,
}, {
  type: 'standardDelivery',
  name: 'Dostawa standardowa (3-4 dni)',
  price: 1000,
  freeFrom: 20000,
}];

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

type PaymentMethod = "creditCard" | "GooglePay" | "test";

interface Discount {
  code: string;
  percentage: number;
}

export interface CheckoutState {
  cart: CartItem[];
  address: Address | null;
  shippmentMethod: ShippmentMethod | null;
  paymentMethod: PaymentMethod | null;
  appliedDiscount: Discount | null;
}

export type CheckoutEvents =
  | { type: "INCREASE_QUANTITY"; productId: string }
  | { type: "REDUCE_QUANTITY"; productId: string }
  | { type: "ADD_PRODUCT"; productId: string }
  | { type: "REMOVE_PRODUCT"; productId: string }
  | { type: "ADD_DISCOUNT"; code: string }
  | {type: "CHOOSE_SHIPPMENT"; methodType: ShippmentMethod["type"]};


const checkoutMachine = createMachine<CheckoutState, CheckoutEvents>({
  id: "checkout",
  initial: "cart",
  context: {
    cart: [],
    address: null,
    shippmentMethod: null,
    paymentMethod: null,
    appliedDiscount: null,
  },
  states: {
    cart: {
      on: {
        INCREASE_QUANTITY: {
          actions: assign({
            cart: (context, event) => {
              return context.cart.map((product) => {
                if (product.id === event.productId) {
                  return { ...product, quantity: product.quantity + 1 };
                }
                return product;
              });
            },
          }),
        },
        ADD_PRODUCT: {
          actions: assign({
            cart: (context, event) => {
              const prodToAdd = findProductById(event.productId);

              if (!prodToAdd) {
                return context.cart;
              }

              const newCartItem: CartItem = {
                id: prodToAdd.id,
                quantity: 1,
                name: `${prodToAdd.name} - ${prodToAdd.manufacturer}`,
                price: prodToAdd.price,
              };
              context.cart = [newCartItem, ...context.cart];
              return context.cart;
            },
          }),
        },
        REMOVE_PRODUCT: {
          actions: assign({
            cart: (context, event) => {
              return context.cart.filter(
                (cartItem) => cartItem.id !== event.productId
              );
            },
          }),
        },
        REDUCE_QUANTITY: {
          actions: assign({
            cart: (context, event) => {
              return context.cart
                .map((product) =>
                  product.id === event.productId
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
                )
                .filter((product) => product.quantity !== 0);
            },
          }),
        },
        ADD_DISCOUNT: {
          actions: assign({
            appliedDiscount: (context, event) => {
              return availableDiscounts.find(discount => discount.code === event.code) ?? null
            }
          })
        },
        CHOOSE_SHIPPMENT: {
          actions: assign({
            shippmentMethod: (context, event) => {
              return shippmentMethods.find(method => method.type === event.methodType) ?? null
            }
          })
        }
      }
    },
    completed: {},
  },
});

export default checkoutMachine;
