import {Injectable} from "@nestjs/common";
import {InjectRepository, InjectDataSource} from "@nestjs/typeorm";
import {Category} from "./models/category.entity";
import {Repository} from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        @InjectDataSource()
        private destinationsRepository: Repository<Category>
    ) {
    }

    async getCategory(): Promise<Category[]> {
        return await this.destinationsRepository.find();
    }

    async postCategory(title: string): Promise<Category[]> {
        await this.destinationsRepository.createQueryBuilder()
            .insert()
            .into(Category)
            .values([
                {title},
            ])
            .execute();

        return await this.destinationsRepository.find();

    }

    async patchCategory(id: number, newTitle: string): Promise<Category[]> {
        await this.destinationsRepository.createQueryBuilder()
            .insert()
            .update(Category)
            .set({title: newTitle})
            .where("id = :id", {id})
            .execute()

        return await this.destinationsRepository.find();

    }


    async deleteCategory(id: number): Promise<Category[]> {
        await this.destinationsRepository.createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", {id})
            .execute();

        return await this.destinationsRepository.find();
    }

}
