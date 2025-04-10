import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Technology} from "./models/technology.entity";
import {Repository} from "typeorm";

@Injectable()
export class TechnologyService {
    constructor(
        @InjectRepository(Technology)
        private destinationsRepository: Repository<Technology>
    ) {
    }

    async getTechnologyList(): Promise<Technology[]> {
        return await this.destinationsRepository.find();
    }

    async postTechnology(title: string): Promise<Technology[]> {
        await this.destinationsRepository.createQueryBuilder()
            .insert()
            .into(Technology)
            .values([
                {title},
            ])
            .execute();

        return await this.destinationsRepository.find();

    }

    async patchTechnology(id: number, newTitle: string): Promise<Technology[]> {
        await this.destinationsRepository.createQueryBuilder()
            .insert()
            .update(Technology)
            .set({title: newTitle})
            .where("id = :id", {id})
            .execute()

        return await this.destinationsRepository.find();
    }

    async deleteTechnology(id: number): Promise<Technology[]> {
        await this.destinationsRepository.createQueryBuilder()
            .delete()
            .from(Technology)
            .where("id = :id", {id})
            .execute();

        return await this.destinationsRepository.find();
    }

}
