import {Controller, Get, Query} from "@nestjs/common";
import {ContentService} from "./content.service";

@Controller("content")
export class ContentController {
    constructor(private readonly contentService: ContentService) {
    }

    @Get()
    async getContent(
        @Query("subCategory") subCategory: number,
        @Query("technology") technology: number
    ) {
        const contentList = await this.contentService.getContent({subCategory, technology});
        return {contentList};
    }
}
