import { assign, createMachine } from "xstate";
import { findProductById } from "../mocks/getProducts";
import { Address } from "../types/Address";
import { availableDiscounts, Discount } from "../types/Discount";
import { shipmentMethods, ShipmentMethod } from "../types/ShipmentMethod";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type PaymentMethod = "creditCard" | "GooglePay" | "test";

export interface CheckoutState {
  cart: CartItem[];
  address: Address | null;
  shipmentMethod: ShipmentMethod | null;
  paymentMethod: PaymentMethod | null;
  appliedDiscount: Discount | null;
}

export type CheckoutEvents =
  | { type: "INCREASE_QUANTITY"; productId: string }
  | { type: "REDUCE_QUANTITY"; productId: string }
  | { type: "ADD_PRODUCT"; productId: string }
  | { type: "REMOVE_PRODUCT"; productId: string }
  | { type: "ADD_DISCOUNT"; code: string }
  | { type: "CHOOSE_SHIPMENT"; methodType: ShipmentMethod["type"] }
  | { type: "CART_COMPLETED" }
  | { type: "ADDRESS_COMPLETED"; address: Address }
  | { type: "SUCCESS" }
  | { type: "PREV" };

const checkoutMachine = createMachine<CheckoutState, CheckoutEvents>({
  id: "checkout",
  initial: "cart",
  context: {
    cart: [],
    address: null,
    shipmentMethod: shipmentMethods[0],
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
              return [newCartItem, ...context.cart];
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
              return (
                availableDiscounts.find(
                  (discount) => discount.code === event.code
                ) ?? null
              );
            },
          }),
        },
        CHOOSE_SHIPMENT: {
          actions: assign({
            shipmentMethod: (context, event) => {
              return (
                shipmentMethods.find(
                  (method) => method.type === event.methodType
                ) ?? null
              );
            },
          }),
        },
        CART_COMPLETED: { target: "address" },
      },
    },
    address: {
      on: {
        PREV: { target: "cart" },
        ADDRESS_COMPLETED: {
          target: "payment",
          actions: assign({
            address: (context, event) => event.address,
          }),
        },
      },
    },
    payment: {
      on: { PREV: { target: "address" }, SUCCESS: { target: "completed" } },
    },
    completed: {},
  },
});

export default checkoutMachine;
