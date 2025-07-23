import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tiendas } from './entity/tiendas';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TiendasService {
  constructor(
    @InjectRepository(tiendas)
    private readonly tiendaRepository: Repository<tiendas>,
  ) {}

  async findAll() {
    return await this.tiendaRepository.find();
  }

  async findOne(idtienda: number) {
    return await this.tiendaRepository.findOne({
      where: { idtienda },
    });
  }

  async findName(nombres: string): Promise<tiendas[]>{
    return await this.tiendaRepository.find({
        where: {
            nombre: Like(`%${nombres}%`)
        }
    });
  }

  async create(objtienda: tiendas) {
    const mitienda = this.tiendaRepository.create(objtienda);

    return await this.tiendaRepository.save(mitienda);
  }

  async remove(idtienda: number) {
    //soft delete no lo elimina en fisico, solo lo deja en estado eliminado, como un apagado el delete si
    await this.tiendaRepository.softDelete(idtienda);

    return { message: `Tienda con el id ${idtienda} a sido eliminado` };
  }

  async update(objtienda: tiendas, idtienda: number) {
    await this.tiendaRepository.update(idtienda, objtienda);

    return await this.tiendaRepository.findOne({ where: { idtienda } });
  }
}
