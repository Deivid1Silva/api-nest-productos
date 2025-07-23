import { productos } from "src/productos/entity/productos";
import { Column, Entity , DeleteDateColumn, OneToOne } from "typeorm";

@Entity()
export class proveedor{
    
    @Column({primary:true, generated: true})
    idproveedor: number

    @Column({length: 250, nullable: false})
    nombre: string

    @Column({length: 20, nullable: false, unique: true} )
    nit: string

    @Column({length: 50, nullable: false})
    telefono: string

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @OneToOne(()=>productos, (miproducto)=> miproducto.miproveedorfk, {onDelete: 'CASCADE'})
    miproducto: productos;
}