import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productos } from './entity/productos';
import { LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(productos)
    private readonly productoRepository: Repository<productos>,
  ) {}

  async findAll() {
    return await this.productoRepository.find({
      relations: ['mitienda', 'miproveedorfk'],
    });
  }

  async findOne(idproducto: number) {
    return await this.productoRepository.findOne({
      where: { idproducto },
      relations: ['mitienda', 'miproveedorfk'],
    });
  }

  async findPrice(priece: number): Promise<productos[]> {
    return await this.productoRepository.find({
      where: {
        //More - mayor 
        //less - menor
        //orequal - adiconal para que tome el que se puso
        precio: LessThanOrEqual(priece),
      },
    });
  }

  async create(objproducto: productos) {
    const miproducto = this.productoRepository.create(objproducto);

    return await this.productoRepository.save(miproducto);
  }

  async remove(idproducto: number) {
    //soft delete no lo elimina en fisico, solo lo deja en estado eliminado, como un apagado el delete si
    await this.productoRepository.softDelete(idproducto);

    return { message: `Producto con el id ${idproducto} a sido eliminado` };
  }

  async update(objproducto: productos, idproducto: number) {
    await this.productoRepository.update(idproducto, objproducto);

    return await this.productoRepository.findOne({ where: { idproducto } });
  }
}
