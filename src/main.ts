import Customer from './entities/customer';
import Order from './entities/order';
import OrderItem from './entities/order_item';
import Address from './vos/address';

const customer = new Customer('123', 'My Customer');
const address = new Address('Rua X', 1, 'Bairro', '', '12345678', 'Sao Paulo', 'SP');
customer.address = address;
customer.activate();

const items = [
  new OrderItem('1', 'Item 1', 10, 'p1', 1),
  new OrderItem('2', 'Item 2', 15.25, 'p2', 1),
];

const order = new Order('1', '123', items);
console.log(order.toString());
