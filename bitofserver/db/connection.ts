import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "../modules/category/models/category.entity";
import {SubCategory} from "../modules/subCategory/models/subCategory.entity";
import {Technology} from "../modules/technology/models/technology.entity";
import {Content} from "../modules/content/models/content.entity";
import {FileList} from "../modules/fileList/models/fileList.entity";

const TypeOrmInstance = TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // ssl: {
    //     ca: fs.readFileSync(process.env.SSL_CA_CERTIFICATES),
    // },

    autoLoadEntities: true,

    synchronize: false,
    entities: [SubCategory, Category, Technology, Content, FileList],
    //synchronize: false, // ❌
    dropSchema: false, // ❌
    logging: true,
});

export default TypeOrmInstance;
