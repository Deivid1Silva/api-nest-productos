import { Injectable } from '@nestjs/common';
import { proveedor } from './entity/proveedor';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProveedoresService {
   
    constructor(
        @InjectRepository(proveedor)
        private readonly proveedorRepository: Repository<proveedor>,
    ){}

    async findAll(){
        return await this.proveedorRepository.find();
    }

    async findOne(idproveedor: number){
        return await this.proveedorRepository.findOne(
            {
                where: {idproveedor}
            }
        );
    }

    async create(objproveedor: proveedor){
        const miproveedor = this.proveedorRepository.create(objproveedor);

        return await this.proveedorRepository.save(miproveedor);
    }

    async remove(idproveedor: number){
        //soft delete no lo elimina en fisico, solo lo deja en estado eliminado, como un apagado el delete si
        await this.proveedorRepository.softDelete(idproveedor);

        return {message: `Proveedor con el id ${idproveedor} a sido eliminado`};
    }

    async update(objproveedor: proveedor, idproveedor: number){
        await this.proveedorRepository.update(idproveedor, objproveedor);

        return await this.proveedorRepository.findOne({where: {idproveedor}});
    }

}
