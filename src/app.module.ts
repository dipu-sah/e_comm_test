import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './sales/entities/sale.entity';

@Module({
  imports: [
    ProductsModule,
    SalesModule,
    MongooseModule.forRoot(
      'mongodb+srv://dipu-kr-sah:CjStrCoV1ploZsQQ@task-manager.t2xg8gu.mongodb.net/?retryWrites=true&w=majority',
      {
        appName: 'e_comm',
      },
    ),
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
