import { Module } from '@nestjs/common';
import { TiendasController } from './tiendas.controller';
import { TiendasService } from './tiendas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tiendas } from './entity/tiendas';

@Module({
  imports: [TypeOrmModule.forFeature([tiendas])],
  controllers: [TiendasController],
  providers: [TiendasService]
})
export class TiendasModule {}
