import {Body, Controller, Delete, Get, Patch, Post, Query} from "@nestjs/common";
import {SubCategoryService} from "./subCategory.service";

@Controller("sub-category")
export class SubCategoryController {
    constructor(private readonly categoryService: SubCategoryService) {
    }

    @Get()
    async getContent(@Query("category") category: string) {
        const subCategoryList = await this.categoryService.getSubCategory({category});
        return {subCategoryList};
    }

    @Post()
    async postContent(@Body() {title, categoryId}: { title: string, categoryId: number }) {
        const subCategoryList = await this.categoryService.postSubCategory(title, categoryId);
        return {subCategoryList};
    }

    @Patch()
    async patchContent(@Body() {id, newTitle}: { id: number, newTitle: string }) {
        const subCategoryList = await this.categoryService.patchSubCategory(id, newTitle);
        return {subCategoryList};
    }

    @Delete()
    async deleteContent(@Query("id") id: number) {
        const subCategoryList = await this.categoryService.deleteSubCategory(id);
        return {subCategoryList};
    }
}
