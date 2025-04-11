import {Controller, Get, Query} from "@nestjs/common";
import {FileListService} from "./fileList.service";

@Controller("file-list")
export class FileListController {
    constructor(private readonly fileListService: FileListService) {
    }

    @Get()
    getContent(@Query("contentId") contentId: number) {
        return this.fileListService.getFileList({contentId});
    }
}
