import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Content} from "../../content/models/content.entity";

@Entity()
export class FileList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column()
    content_id: number;

    @Column()
    file_extension: string;

    @Column()
    link: string;

    @ManyToOne(() => Content, (content) => content.id, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    })
    @JoinColumn({name: "content_id"})
    public content!: Content;
}
