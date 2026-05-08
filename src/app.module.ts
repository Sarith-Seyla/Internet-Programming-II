import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { Task } from './modules/tasks/task.entity';
import { UserModule } from './modules/users/user.module';
import { TaskModule } from './modules/tasks/task.module';
import { Receipt } from './receipts/receipt.entity';
import { ReceiptsModule } from './receipts/receipts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { GraphqlModule } from 'graphql/graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
      // autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: false, // Set to false to use the plugin instead
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [User, Task, Receipt],
      synchronize: true, // use only in development!
    }),
    UserModule,
    TaskModule,
    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
    CoreModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
