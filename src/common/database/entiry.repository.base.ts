import {
  AggregateOptions,
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T> {
    return this.entityModel.findOne(entityFilter, { ...projection });
  }

  async find(
    entityFilter: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<T[]> {
    return this.entityModel.find(entityFilter, { ...projection }, options);
  }

  async count(entityFilter): Promise<number> {
    return this.entityModel.countDocuments(entityFilter);
  }

  async create(createEntityData: Partial<T>): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    entity: UpdateQuery<T>,
  ): Promise<T> {
    return this.entityModel.findOneAndUpdate(entityFilterQuery, entity, {
      new: true,
    });
  }

  async delete(entityFilterQuery: FilterQuery<T>): Promise<{
    acknowledged: boolean;
    deletedCount: number;
  }> {
    return this.entityModel.deleteOne(entityFilterQuery);
  }

  async aggregate(
    pipeline: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<T[]> {
    return this.entityModel.aggregate(pipeline, options);
  }
}
