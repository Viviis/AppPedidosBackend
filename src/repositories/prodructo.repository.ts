import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Prodructo, ProdructoRelations} from '../models';

export class ProdructoRepository extends DefaultCrudRepository<
  Prodructo,
  typeof Prodructo.prototype.id,
  ProdructoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Prodructo, dataSource);
  }
}
