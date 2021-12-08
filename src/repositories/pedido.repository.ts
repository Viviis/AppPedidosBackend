import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Persona, Prodructo} from '../models';
import {PersonaRepository} from './persona.repository';
import {ProdructoRepository} from './prodructo.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id>;

  public readonly prodructo: HasOneRepositoryFactory<Prodructo, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ProdructoRepository') protected prodructoRepositoryGetter: Getter<ProdructoRepository>,
  ) {
    super(Pedido, dataSource);
    this.prodructo = this.createHasOneRepositoryFactoryFor('prodructo', prodructoRepositoryGetter);
    this.registerInclusionResolver('prodructo', this.prodructo.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
