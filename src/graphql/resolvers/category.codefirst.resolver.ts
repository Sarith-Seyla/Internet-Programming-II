import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type';

@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  private mockCategories = [{ id: 1, name: 'Electronics' }];

  @Query(() => [CategoryType])
  categories() {
    return this.mockCategories;
  }

  @Mutation(() => CategoryType)
  createCategory(@Args('name') name: string) {
    const newCat = { id: this.mockCategories.length + 1, name };
    this.mockCategories.push(newCat);
    return newCat;
  }
}