import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TiendasService } from './tiendas.service';
import { tiendas } from './entity/tiendas';

@Controller('tiendas')
export class TiendasController {
  constructor(private readonly tiendaService: TiendasService) {}

  @Get('list')
  findAll() {
    return this.tiendaService.findAll();
  }

  @Get(':idtienda')
  findOne(@Param('idtienda') idtienda: number) {
    return this.tiendaService.findOne(idtienda);
  }

  @Get('nombre/:nombre')
  async findName(@Param('nombre') nombretienda: string) {
    const resultado = await this.tiendaService.findName(nombretienda);

    if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
      return {
        statusCode: 404,
        message: 'No se ha encontrado una tienda con esos caracteres',
      };
    }

    return resultado;
  }

  @Post('create')
  create(@Body() objtienda: tiendas) {
    return this.tiendaService.create(objtienda);
  }

  @Delete(':idtienda')
  remove(@Param('idtienda') idtienda: number) {
    return this.tiendaService.remove(+idtienda);
  }

  //el put si un campo se daña toda la informacion queda nula en el envio y BD,
  //mientras que el Patch si se daña uno no afecta el resto y permite actualizar datos que uno quiera y no todo
  @Patch(':idtienda')
  update(@Param('idtienda') idtienda: number, @Body() objtienda: tiendas) {
    return this.tiendaService.update(objtienda, +idtienda);
  }
}
