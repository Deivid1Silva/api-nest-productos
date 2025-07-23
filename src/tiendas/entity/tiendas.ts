import { productos } from "src/productos/entity/productos";
import { Column, Entity , DeleteDateColumn, OneToMany } from "typeorm";

@Entity()
export class tiendas{
    
    @Column({primary:true, generated: true})
    idtienda: number

    @Column({length: 150, nullable: false})
    nombre: string

    @Column({length: 250, nullable: false,} )
    direccion: string

    @Column({length: 50, nullable: false})
    telefono: string

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @OneToMany(()=> productos, (miproducto)=> miproducto.mitienda, {onDelete: 'CASCADE'})
    miproducto: productos[];
}