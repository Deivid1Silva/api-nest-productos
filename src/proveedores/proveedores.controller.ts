import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { proveedor } from './entity/proveedor';

@Controller('proveedores')
export class ProveedoresController {

    constructor(
        private readonly proveedorService: ProveedoresService
    ){}

    @Get('list')
    findAll(){
        return this.proveedorService.findAll();
    }

    @Get(':idproveedor')
    findOne(@Param('idproveedor') idproveedor: number){
        return this.proveedorService.findOne(idproveedor);
    }

    @Post('create')
    create(@Body() objproveedor: proveedor){
        return this.proveedorService.create(objproveedor);
    }

    @Delete(':idproveedor')
    remove(@Param('idproveedor') idproveedor: number){
        return this.proveedorService.remove(+idproveedor);
    }

    //el put si un campo se daña toda la informacion queda nula en el envio y BD,
    //mientras que el Patch si se daña uno no afecta el resto y permite actualizar datos que uno quiera y no todo
    @Patch(':idproveedor')
    update(@Param('idproveedor') idproveedor: number, @Body() objproveedor: proveedor){
        return this.proveedorService.update(objproveedor, +idproveedor);
    }
}