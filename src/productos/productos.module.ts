import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { productos } from './entity/productos';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([productos])],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
