import Product from '../entities/product';
import ProductService from './product.service';

describe('Product service unit tests', () => {
  it('Should change the prices of all products', () => {
    // Arrange
    const products = [
      new Product('p1', 'Product 1', 100),
      new Product('p2', 'Product 2', 200),
    ];

    // Act
    ProductService.increasePrice(products, 50);

    // Assert
    expect(products[0].price).toBe(150);
    expect(products[1].price).toBe(300);
  });
});
