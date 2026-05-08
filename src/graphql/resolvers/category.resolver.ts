import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver('Category') 
export class CategoryResolver {
  private categories = [{ id: '1', name: 'Electronics' }];

  @Query('categories')
  getCategories() {
    return this.categories;
  }

  @Mutation('createCategory')
  createCategory(@Args('name') name: string) {
    const newCat = { id: String(this.categories.length + 1), name };
    this.categories.push(newCat);
    return newCat;
  }
}