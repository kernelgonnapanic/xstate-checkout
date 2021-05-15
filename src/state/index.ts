import {assign, createMachine} from "xstate";

export interface Product {
  id: string;
  name: string;
  price: number;
  withShipping: boolean;
  quantity: number;
}

type Countries = 'PL' | 'US';

interface Address {
  street: string;
  city: string;
  country: Countries;
}

interface ShippmentMethod {
  type: string;
  price: number;
  name: string;
  freeFrom: number | null;
}

export const shippmentMethods : ShippmentMethod[] = [{
  type: 'expressDelivery',
  name: 'Dostawa ekspresowa (1-2 dni)',
  price: 2500,
  freeFrom: null,
}, {
  type: 'standardDelivery',
  name: 'Dostawa standardowa (3-4 dni)',
  price: 1000,
  freeFrom: 20000,
}];

export const availableDiscounts: Discount[] = [{
  code: 'Maj20',
  percentage: 20,
}, {
  code: 'WielkaPromocja',
  percentage: 40,
}]

type PaymentMethod = 'creditCard' | 'GooglePay' | 'test';

interface Discount {
  code: string;
  percentage: number;
}

export interface CheckoutState {
  cart: Product[];
  address: Address | null;
  shippmentMethod: ShippmentMethod | null;
  paymentMethod: PaymentMethod | null;
  appliedDiscount: Discount | null;
}

export type CheckoutEvents =
  | {type: 'ADD_PRODUCT'; productId: string}
  | {type: 'REMOVE_PRODUCT'; productId: string}
  | {type: 'ADD_DISCOUNT'; code: string}

const checkoutMachine = createMachine<CheckoutState, CheckoutEvents>({
  id: "checkout",
  initial: "cart",
  context: {
    cart: [{
      id: '1',
      name: 'Testowy produkt',
      price: 3000,
      quantity: 2,
      withShipping: false,
    }, {
      id: '2',
      name: 'Buty',
      price: 6000,
      quantity: 1,
      withShipping: true,
    }],
    address: null,
    shippmentMethod: null,
    paymentMethod: null,
    appliedDiscount: null
  },
  states: {
    cart: {
      on: {
        ADD_PRODUCT: {
          actions: assign({
            cart: (context, event) => {              
              return context.cart.map(product => {
                if (product.id === event.productId) {
                  return {...product, quantity: product.quantity + 1}
                }
                return product
              });
            }
          }),
        }, 
        REMOVE_PRODUCT: {
          actions: assign({
            cart: (context, event) => {
              return context.cart
              .map(product => product.id === event.productId ? 
                {...product, quantity: product.quantity - 1} : 
                product)
              .filter(product => product.quantity !== 0);
            }
          }),
        },
        ADD_DISCOUNT: {
          actions: assign({
            appliedDiscount: (context, event) => {
              console.log('Add', event, availableDiscounts.find(discount => discount.code === event.code) ?? null)
              return availableDiscounts.find(discount => discount.code === event.code) ?? null
            }
          })
        }
      }
    },
    completed: {}
  }
});

export default checkoutMachine;