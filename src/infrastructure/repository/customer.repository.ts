import Customer from '../../domain/entities/customer';
import CustomerRepositoryInterface from '../../domain/repositories/customer-repository-interface';
import Address from '../../domain/vos/address';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true
      });
    } catch (error) {
      throw new Error('Customer not found');
    }

    return this.mapToEntity(customerModel);
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customerModel) => this.mapToEntity(customerModel));
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create(this.mapToModel(entity).toJSON());
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(this.mapToModel(entity).toJSON(), {
      where: {
        id: entity.id
      }
    });
  }

  private mapToModel(customer: Customer): CustomerModel {
    return new CustomerModel({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      district: customer.address.district,
      complement: customer.address.complement,
      zipcode: customer.address.zip,
      city: customer.address.city,
      state: customer.address.state,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    });
  }

  private mapToEntity(customerModel: CustomerModel): Customer {
    const customer = new Customer(customerModel.id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.district,
      customerModel.complement,
      customerModel.zipcode,
      customerModel.city,
      customerModel.state
    );

    customer.changeAddress(address);
    customer.addRewardPoints(customerModel.rewardPoints);

    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }
}
