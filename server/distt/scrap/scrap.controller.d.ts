import { ScrapService } from './scrap.service';
import { CreateScrapDto } from './dto/create-scrap.dto';
import { UpdateScrapDto } from './dto/update-scrap.dto';
import { LinkedinScrapDto } from './dto/linkedin-scrap.dto';
export declare class ScrapController {
    private readonly scrapService;
    constructor(scrapService: ScrapService);
    create(createScrapDto: CreateScrapDto): string;
    findAll(): string;
    findAllByUser(userId: number): Promise<import("./entities/scrap.entity").Scrap[]>;
    linkedin(linkedinScrapDto: LinkedinScrapDto): Promise<any>;
    findOne(id: string): string;
    update(id: string, updateScrapDto: UpdateScrapDto): string;
    remove(id: string): string;
}
