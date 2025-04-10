import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FileList} from "./models/fileList.entity";
import {Repository} from "typeorm";

@Injectable()
export class FileListService {
    constructor(
        @InjectRepository(FileList)
        private destinationsRepository: Repository<FileList>
    ) {
    }

    async getFileList({contentId}) {
        const isQueryEmpty = !!contentId;

        const where = {
            ...(isQueryEmpty && {
                content: {
                    code: `${contentId}`,
                },
            }),
        };

        return await this.destinationsRepository.find({
            relations: ["content"],
            ...(!isQueryEmpty && {where}),
        });
    }
}
