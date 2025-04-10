import {
    OneToMany,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import {SubCategory} from "../../subCategory/models/subCategory.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => SubCategory, (subCategory) => subCategory.category_id)
    @JoinColumn({name: "id"})
    public subCategory: SubCategory;
}
