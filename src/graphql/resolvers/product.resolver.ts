import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

@Resolver('Product')
export class ProductResolver {
  private products = [{ id: '1', name: 'Laptop', price: 999.99, categoryId: '1' }];

  @Query('products')
  getProducts() {
    return this.products;
  }

  @Mutation('createProduct')
  createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
  ) {
    const newProd = { id: String(this.products.length + 1), name, price, categoryId };
    this.products.push(newProd);
    return newProd;
  }

  // This handles the relationship!
  @ResolveField('category')
  category(@Parent() product: any) {
    return { id: product.categoryId, name: 'Electronics' }; // Mock category
  }
}