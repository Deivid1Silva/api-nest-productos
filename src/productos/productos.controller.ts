import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductosService } from './productos.service';
import { productos } from './entity/productos';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productoService: ProductosService) {}

  // 🔓 Ruta pública: obtener todos los productos
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  findAll() {
    return this.productoService.findAll();
  }

  // 🔓 Ruta pública: obtener un producto por ID
  @Get(':idproducto')
  findOne(@Param('idproducto') idproducto: number) {
    return this.productoService.findOne(idproducto);
  }

  // 🔓 Ruta pública: buscar productos menores o iguales a cierto precio
  @Get('MenorIgual/:precio')
  async findName(@Param('precio') precioProducto: number) {
    const resultado = await this.productoService.findPrice(precioProducto);

    if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
      return {
        message: 'No se ha encontrado un producto con ese valor',
      };
    }

    return resultado;
  }

  // 🔒 Ruta protegida: crear un nuevo producto
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() objproducto: productos, @Request() req) {
    console.log('Usuario autenticado:', req.user);
    return this.productoService.create(objproducto);
  }

  // 🔒 Ruta protegida: eliminar un producto
  @UseGuards(AuthGuard('jwt'))
  @Delete(':idproducto')
  remove(@Param('idproducto') idproducto: number) {
    return this.productoService.remove(+idproducto);
  }

  // 🔒 Ruta protegida: actualizar parcialmente un producto
  @UseGuards(AuthGuard('jwt'))
  @Patch(':idproducto')
  update(
    @Param('idproducto') idproducto: number,
    @Body() objproducto: productos,
  ) {
    return this.productoService.update(objproducto, +idproducto);
  }
}
