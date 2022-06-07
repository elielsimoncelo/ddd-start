import { Sequelize } from 'sequelize-typescript';
import Customer from '../../domain/entities/customer';
import Address from '../../domain/vos/address';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';

describe('Customer Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  const makeCustomer = (id: string): Customer => {
    const customer = new Customer(`${id}`, `Customer ${id}`);
    const address = new Address(
      `Street ${id}`,
      1,
      `District ${id}`,
      `Complement ${id}`,
      `Zipcode ${id}`,
      `City ${id}`,
      `State ${id}`
    );

    customer.changeAddress(address);
    customer.addRewardPoints(100);
    customer.activate();

    return customer;
  }

  it('Should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = makeCustomer('1');

    await customerRepository.create(customer);
    const customerModelCreated = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModelCreated.toJSON()).toStrictEqual({
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
      rewardPoints: customer.rewardPoints,
    });
  })

  it('Should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = makeCustomer('1');

    await customerRepository.create(customer);
    const customerModelCreated = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModelCreated.toJSON()).toStrictEqual({
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
      rewardPoints: customer.rewardPoints,
    });

    customer.changeName('Customer 2');

    await customerRepository.update(customer);
    const customerModelUpdated = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModelUpdated.toJSON()).toStrictEqual({
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
      rewardPoints: customer.rewardPoints,
    });
  })

  it('Should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find('XXABC123')
    }).rejects.toThrow('Customer not found');
  })

  it('Should find a product', async () => {
    const customerRepository = new CustomerRepository();
    const customer = makeCustomer('1');

    await customerRepository.create(customer);
    const customerModelCreated = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModelCreated.toJSON()).toStrictEqual({
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
      rewardPoints: customer.rewardPoints,
    });

    const customerFound = await customerRepository.find('1');

    expect(customerModelCreated.toJSON()).toStrictEqual({
      id: customerFound.id,
      name: customerFound.name,
      street: customerFound.address.street,
      number: customerFound.address.number,
      district: customerFound.address.district,
      complement: customerFound.address.complement,
      zipcode: customerFound.address.zip,
      city: customerFound.address.city,
      state: customerFound.address.state,
      active: customerFound.isActive(),
      rewardPoints: customerFound.rewardPoints,
    });
  })

  it('Should find all products', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = makeCustomer('1');
    await customerRepository.create(customer1);

    const customer2 = makeCustomer('2');
    await customerRepository.create(customer2);

    const customersFound = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(customers).toEqual(customersFound);
  })
})
