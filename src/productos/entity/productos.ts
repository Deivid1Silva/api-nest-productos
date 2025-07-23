import { proveedor } from "src/proveedores/entity/proveedor";
import { tiendas } from "src/tiendas/entity/tiendas";
import { Column, Entity , DeleteDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class productos{
    
    @Column({primary:true, generated: true})
    idproducto: number

    @Column({length: 200, nullable: false})
    nombre: string

    @Column({length: 255, nullable: false} )
    descripcion: string

    @Column({nullable: false})
    precio: number
    
    @Column({nullable: false})
    cantidad_actual: number
    
    @Column({nullable: false})
    cantidad_minima: number

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @ManyToOne(()=>tiendas, (mitienda)=> mitienda.miproducto, {onDelete: 'CASCADE'})
    mitienda: tiendas

    @OneToOne(()=> proveedor)
    @JoinColumn({name: 'proveedorfk'})
    miproveedorfk: proveedor
}