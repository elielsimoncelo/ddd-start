import { v4 as uuid } from 'uuid';
import Customer from '../entities/customer';
import Order from '../entities/order';
import OrderItem from '../entities/order_item';

export default class OrderService {
  public static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  public static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if (orderItems.length === 0) {
      throw new Error('Order must have at least one item.');
    }

    const order = new Order(uuid(), customer.id, orderItems);
    customer.addRewardPoints(order.total() / 2);

    return order;
  }
}
