import {createMachine} from "xstate";

interface Product {
  name: string; // TODO: max 20 znaków
  price: number; // TODO: + waluta? + czy da się wymusić typem brak ujemnych + z centami
  withShipping: boolean;
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
  initial: "card",
  context: {
    cart: [],
    address: null,
    shippmentMethod: null,
    paymentMethod: null,
  },
  states: {
    cart: {},
    adressed: {},
    shippingSelected: {},
    shippingSkipped: {},
    paymentSelected: {},
    paymentSkipped: {},
    completed: {}
  }
});

export default checkoutMachine;