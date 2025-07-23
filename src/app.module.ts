import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos personalizados
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { TiendasModule } from './tiendas/tiendas.module';


// ENTIDADES
import { proveedor } from './proveedores/entity/proveedor';
import { tiendas } from './tiendas/entity/tiendas';
import { productos } from './productos/entity/productos';
import { Usuario } from './auth/usuario.entity'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'Inventario2',
      entities: [proveedor, tiendas, productos, Usuario],
      synchronize: true,
      autoLoadEntities: true, // útil para registrar automáticamente entidades de cada módulo
    }),
    ProveedoresModule,
    ProductosModule,
    TiendasModule,
    AuthModule, // Nuevo módulo de autenticación
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
