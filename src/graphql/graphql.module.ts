import { Module } from '@nestjs/common';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
  providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}