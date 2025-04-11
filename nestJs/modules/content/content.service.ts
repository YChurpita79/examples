import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Content } from "./models/content.entity";
import { Repository } from "typeorm";
import { selectContent } from "./query/quert";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private destinationsRepository: Repository<Content>
  ) {}

  async getContent({ technology, subCategory } : {technology: number, subCategory: number}): Promise<Content[]> {
    const isQueryEmpty = !!technology && !!subCategory;
    const queryData =  selectContent({subCategory, technology, isQueryEmpty});
    return await this.destinationsRepository.query(queryData);
  }
}
