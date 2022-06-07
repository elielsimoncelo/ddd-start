import Customer from '../entities/customer';
import Order from '../entities/order';
import OrderItem from '../entities/order-item';
import OrderService from './order.service';

describe('Order service unit tests', () => {
  it('Should get total of all orders', () => {
    // Arrange
    const orders = [
      new Order('o1', 'c1', [
        new OrderItem('1', 'Item 1', 200, 'p1', 1),
        new OrderItem('2', 'Item 1', 400, 'p2', 1),
      ]),
      new Order('o2', 'c1', [
        new OrderItem('1', 'Item 1', 100, 'p1', 2),
        new OrderItem('2', 'Item 1', 300, 'p2', 2),
        new OrderItem('2', 'Item 1', 500, 'p2', 3),
      ]),
    ];

    // Act
    const total = OrderService.total(orders);

    // Assert
    expect(total).toBe(2900);
  });

  it('Should place an order', () => {
    // Arrange
    const customer = new Customer('c1', 'Customer 1');
    const orderItems = [new OrderItem('i1', 'Item 1', 100, 'p1', 2)];

    // Act
    const order = OrderService.placeOrder(customer, orderItems);

    // Assert
    expect(customer.rewardPoints).toBe(100);
    expect(order.total()).toBe(200);
  });
});
