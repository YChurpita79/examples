import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CategoryModule} from "./modules/category/category.module";
import {SubCategoryModule} from "./modules/subCategory/subCategory.module";
import {TechnologyModule} from "./modules/technology/technology.module";
import {ContentModule} from "./modules/content/content.module";
import {FileListModule} from "./modules/fileList/fileList.module";
import TypeOrmInstance from "./db/connection";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmInstance,
        CategoryModule,
        TechnologyModule,
        ContentModule,
        SubCategoryModule,
        FileListModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
