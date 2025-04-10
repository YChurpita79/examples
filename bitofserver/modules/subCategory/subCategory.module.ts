import {Module} from "@nestjs/common";
import {SubCategoryController} from "./subCategory.controller";
import {SubCategoryService} from "./subCategory.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubCategory} from "./models/subCategory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SubCategory])],
    controllers: [SubCategoryController],
    providers: [SubCategoryService],
    exports: [SubCategoryService],
})
export class SubCategoryModule {
}
