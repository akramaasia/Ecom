import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './shared.config/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './datasource/typeorm.config.service';
import { OutletModule } from './outlet/outlet.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartDetailsModule } from './cart-details/cart-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],

      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return new DataSource(options);
      },
    }),
    AuthModule, UserModule, OutletModule, ProductsModule, OrdersModule, CartDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
