import { Logger, NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { BaseFindInputDto } from './dto/base-find.input.dto';
import { BaseFindResponseDto } from './dto/base-find.response.dto';

export abstract class BaseRepository<T extends Document> {
    constructor(
        protected readonly model: Model<T>,
        protected readonly loggerName: string,
        protected readonly projection?: object,
    ) {}

    protected logger = new Logger(this.loggerName);

    protected collectionName = this.model.collection.collectionName;

    async create(data: Partial<T>): Promise<T> {
        this.logger.log(`Creating ${this.collectionName} with ${JSON.stringify(data)}`);
        const item = new this.model(data);
        return item.save();
    }

    async find(queryFilter: BaseFindInputDto): Promise<BaseFindResponseDto<T>> {
        this.logger.log(`Finding ${this.collectionName}<filter:${JSON.stringify(queryFilter)}>`);
        const { skip, limit, sort, ...filter } = queryFilter;
        const items = await this.model
            .find(filter as object, this.projection)
            .sort(sort || { createdAt: -1 })
            .limit(limit)
            .skip(skip);
        const total = await this.model.countDocuments(filter as object);

        return { docs: items, totalCount: total };
    }

    async findById(id: string): Promise<T> {
        this.logger.log(`Finding ${this.collectionName}:<id:${id}>`);
        const item = await this.model.findById(id, this.projection);
        if (!item) {
            throw new NotFoundException(`${this.collectionName}:<id:${id}> not found`);
        }
        return item;
    }

    async findOne(filter: object): Promise<T> {
        this.logger.log(`Finding ${this.collectionName}:<filter:${JSON.stringify(filter)}>`);
        const item = await this.model.findOne(filter, this.projection);
        if (!item) {
            throw new NotFoundException(`${this.collectionName} with filter ${JSON.stringify(filter)} not found`);
        }
        return item;
    }

    async update(id: string, data: object): Promise<T> {
        this.logger.log(`Updating ${this.collectionName}:<id:${id}> with ${JSON.stringify(data)}`);
        const item = await this.model.findByIdAndUpdate(id, data, { new: true });
        if (!item) {
            throw new NotFoundException(`${this.collectionName}:<id:${id}> not found`);
        }
        return item;
    }

    async delete(id: string): Promise<T> {
        this.logger.log(`Deleting ${this.collectionName}:<id:${id}>`);
        const item = await this.model.findByIdAndDelete(id);
        if (!item) {
            throw new NotFoundException(`${this.collectionName}:<id:${id}> not found`);
        }
        return item;
    }
}
