import Product from '../entities/product';

export default class ProductService {
  public static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      product.changePrice(product.price * (1 + percentage / 100));
    });

    return products;
  }
}
