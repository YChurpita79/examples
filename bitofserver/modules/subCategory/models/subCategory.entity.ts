import {
    ManyToOne,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import {Category} from "../../category/models/category.entity";

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category_id: number;

    @ManyToOne(() => Category, (category) => category.id, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    })
    @JoinColumn({name: "category_id"})
    public category!: Category;
}
