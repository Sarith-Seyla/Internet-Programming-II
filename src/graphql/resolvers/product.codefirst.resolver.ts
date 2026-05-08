import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  private mockProducts = [{ id: 1, name: 'Laptop', price: 999.99, categoryId: 1 }];

  @Query(() => [ProductType])
  products() {
    return this.mockProducts;
  }

  @Mutation(() => ProductType)
  createProduct(@Args('input') input: CreateProductInput) {
    const newProd = { id: this.mockProducts.length + 1, ...input };
    this.mockProducts.push(newProd);
    return newProd;
  }

  @ResolveField(() => CategoryType, { nullable: true })
  category(@Parent() product: ProductType) {
    // Mocking the relation resolution
    return { id: product.categoryId, name: 'Electronics' }; 
  }
}