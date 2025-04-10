import {Body, Controller, Get, Post, Patch, Delete, Query} from "@nestjs/common";
import {CategoryService} from "./category.service";


@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get()
    async getContent() {
        const categoryList = await this.categoryService.getCategory();
        return {categoryList};
    }

    @Post()
    async postContent(@Body() {title}: { title: string }) {
        const categoryList = await this.categoryService.postCategory(title);
        return {categoryList};
    }

    @Patch()
    async patchContent(@Body() {id, newTitle}: { id: number, newTitle: string }) {
        const categoryList = await this.categoryService.patchCategory(id, newTitle);
        return {categoryList};
    }

    @Delete()
    async deleteContent(@Query("id") id: number) {
        const categoryList = await this.categoryService.deleteCategory(id);
        return {categoryList};
    }
}
