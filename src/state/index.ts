import {assign, createMachine} from "xstate";

export interface Product {
  id: string;
  name: string; // TODO: max 20 znaków
  price: number; // TODO: + waluta? + czy da się wymusić typem brak ujemnych + z centami
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
  type: string; // czy mocniej?
  enabledFor: Countries[]
}

const shippmentMethods : ShippmentMethod[] = [{
  type: 'expressDelivery',
  enabledFor: ['PL']
}, {
  type: 'standardDelivery',
  enabledFor: ['PL', 'US']
}];

type PaymentMethod = 'creditCard' | 'GooglePay' | 'test';

interface CheckoutState {
  cart: Product[];
  address: Address | null;
  shippmentMethod: ShippmentMethod | null;
  paymentMethod: PaymentMethod | null;
}

const checkoutMachine = createMachine<CheckoutState>({
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
  },
  states: {
    cart: {
      on: {
        ADD_PRODUCT: {
          actions: assign((context, event) => {
            const updatedProduct = context.cart.find(product => product.id === event.productId);
            
            return {
              ...context,
            }
          }),
        }, 
        REMOVE_PRODUCT: {
          actions: assign((context, event) => { //TODO: type it in a better way
            const updatedProduct = context.cart.find(product => product.id === event.productId);
            console.log(updatedProduct);
            return {
              ...context
            }
          }),
        }
      }
    },
    adressed: {},
    shippingSelected: {},
    shippingSkipped: {},
    paymentSelected: {},
    paymentSkipped: {},
    completed: {}
  }
});

export default checkoutMachine;