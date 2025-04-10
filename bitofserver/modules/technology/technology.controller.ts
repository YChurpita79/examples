import {Body, Controller, Delete, Get, Patch, Post, Query} from "@nestjs/common";
import {TechnologyService} from "./technology.service";

@Controller("technology")
export class TechnologyController {
    constructor(private readonly technologyService: TechnologyService) {
    }

    @Get()
    async getContent() {
        const technologyList = await this.technologyService.getTechnologyList();
        return {technologyList};
    }

    @Post()
    async postContent(@Body() {title}: { title: string }) {
        const technologyList = await this.technologyService.postTechnology(title);
        return {technologyList};
    }

    @Patch()
    async patchContent(@Body() {id, newTitle}: { id: number, newTitle: string }) {
        const technologyList = await this.technologyService.patchTechnology(id, newTitle);
        return {technologyList};
    }

    @Delete()
    async deleteContent(@Query("id") id: number) {
        const technologyList = await this.technologyService.deleteTechnology(id);
        return {technologyList};
    }
}
