import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SubCategory} from "./models/subCategory.entity";
import {Repository} from "typeorm";
import {Category} from "../category/models/category.entity";

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategory)
        private destinationsRepository: Repository<SubCategory>
    ) {
    }

    async getSubCategory({category}): Promise<SubCategory[]> {
        const isQueryEmpty = !!category;

        const where = {
            ...(!!category && {
                category: {
                    title: `${category}`,
                },
            }),
        };

        return await this.destinationsRepository.find({
            relations: ["category"],
            ...(isQueryEmpty && {where}),
        });
    }


    async postSubCategory(title: string, categoryId: number): Promise<SubCategory[]> {
        await this.destinationsRepository.createQueryBuilder()
            .insert()
            .into(SubCategory)
            .values([
                {title, category_id: categoryId},
            ])
            .execute();

        return await this.destinationsRepository.find(
            {relations: ["category"],}
        );

    }

    async patchSubCategory(id: number, newTitle: string): Promise<SubCategory[]> {
        await this.destinationsRepository.createQueryBuilder()
            .insert()
            .update(SubCategory)
            .set({title: newTitle})
            .where("id = :id", {id})
            .execute()

        return await this.destinationsRepository.find({relations: ["category"],});

    }


    async deleteSubCategory(id: number): Promise<SubCategory[]> {
        await this.destinationsRepository.createQueryBuilder()
            .delete()
            .from(SubCategory)
            .where("id = :id", {id})
            .execute();

        return await this.destinationsRepository.find({relations: ["category"],});
    }


}
