import {Module} from "@nestjs/common";
import {TechnologyController} from "./technology.controller";
import {TechnologyService} from "./technology.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Technology} from "./models/technology.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Technology])],
    controllers: [TechnologyController],
    providers: [TechnologyService],
    exports: [TechnologyService],
})
export class TechnologyModule {
}
