import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {SubCategory} from "../../subCategory/models/subCategory.entity";
import {Technology} from "../../technology/models/technology.entity";
import {FileList} from "../../fileList/models/fileList.entity";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sub_category_id: number;

    @Column({type: "longtext"})
    content: string;

    @Column({type: "longtext"})
    code: string;

    @Column()
    title: string;

    @Column()
    technology_id: number;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.id, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    })
    @JoinColumn({name: "sub_category_id"})
    public subCategory!: SubCategory;

    @ManyToOne(() => Technology, (technology) => technology.id, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    })
    @JoinColumn({name: "technology_id"})
    public technology!: Technology;

    @OneToMany(() => FileList, (fileList) => fileList.content_id)
    @JoinColumn({name: "id"})
    public fileList: FileList;
}
