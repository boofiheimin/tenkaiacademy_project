import { Logger, NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { BaseFindParamsDto } from './dto/base-find.params.dto';
import { BaseFindResponseDto } from './dto/base-find.response.dto';

export default class BaseService<T extends Document> {
    constructor(
        protected readonly model: Model<T>,
        protected readonly logger: Logger,
        protected readonly projection?: object,
    ) {}

    private collectionName = this.model.collection.collectionName;

    public async create(data: Partial<T>): Promise<T> {
        this.logger.log(`Creating ${this.collectionName} with ${JSON.stringify(data)}`);
        const item = new this.model(data);
        return item.save();
    }

    public async find(queryFilter: BaseFindParamsDto): Promise<BaseFindResponseDto<T>> {
        this.logger.log(`Finding ${this.collectionName}<filter:${queryFilter}>`);
        const { skip, limit, sort, ...filter } = queryFilter;
        const items = await this.model
            .find(filter as object, this.projection)
            .sort(sort || { createdAt: -1 })
            .limit(limit)
            .skip(skip);
        const total = await this.model.countDocuments(filter as object);

        return { docs: items, totalCount: total };
    }

    public async findById(id: string): Promise<T> {
        this.logger.log(`Finding ${this.collectionName}:<id:${id}>`);
        const item = await this.model.findById(id);
        if (!item) {
            throw new NotFoundException(`${this.collectionName}:<id:${id}> not found`);
        }
        return item;
    }

    public async findOne(filter: object): Promise<T> {
        this.logger.log(`Finding ${this.collectionName}:<filter:${JSON.stringify(filter)}>`);
        const item = await this.model.findOne(filter);
        if (!item) {
            throw new NotFoundException(`${this.collectionName} with filter ${filter} not found`);
        }
        return item;
    }

    public async update(id: string, data: Partial<T>): Promise<T> {
        this.logger.log(`Updating ${this.collectionName}:<id:${id}> with ${JSON.stringify(data)}`);
        const item = await this.model.findByIdAndUpdate(id, data as object, { new: true });
        if (!item) {
            throw new NotFoundException(`${this.collectionName}:<id:${id}> not found`);
        }
        return item;
    }

    public async delete(id: string): Promise<T> {
        this.logger.log(`Deleting ${this.collectionName}:<id:${id}>`);
        const item = await this.model.findByIdAndDelete(id);
        if (!item) {
            throw new NotFoundException(`${this.collectionName}:<id:${id}> not found`);
        }
        return item;
    }
}
