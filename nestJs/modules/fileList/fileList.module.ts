import {Module} from "@nestjs/common";
import {FileListController} from "./fileList.controller";
import {FileListService} from "./fileList.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileList} from "./models/fileList.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FileList])],
    controllers: [FileListController],
    providers: [FileListService],
    exports: [FileListService],
})
export class FileListModule {
}
