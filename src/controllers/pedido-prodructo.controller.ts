import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Prodructo,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoProdructoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/prodructo', {
    responses: {
      '200': {
        description: 'Pedido has one Prodructo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prodructo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Prodructo>,
  ): Promise<Prodructo> {
    return this.pedidoRepository.prodructo(id).get(filter);
  }

  @post('/pedidos/{id}/prodructo', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prodructo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodructo, {
            title: 'NewProdructoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) prodructo: Omit<Prodructo, 'id'>,
  ): Promise<Prodructo> {
    return this.pedidoRepository.prodructo(id).create(prodructo);
  }

  @patch('/pedidos/{id}/prodructo', {
    responses: {
      '200': {
        description: 'Pedido.Prodructo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodructo, {partial: true}),
        },
      },
    })
    prodructo: Partial<Prodructo>,
    @param.query.object('where', getWhereSchemaFor(Prodructo)) where?: Where<Prodructo>,
  ): Promise<Count> {
    return this.pedidoRepository.prodructo(id).patch(prodructo, where);
  }

  @del('/pedidos/{id}/prodructo', {
    responses: {
      '200': {
        description: 'Pedido.Prodructo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prodructo)) where?: Where<Prodructo>,
  ): Promise<Count> {
    return this.pedidoRepository.prodructo(id).delete(where);
  }
}
