import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Prodructo} from '../models';
import {ProdructoRepository} from '../repositories';

export class ProductoController {
  constructor(
    @repository(ProdructoRepository)
    public prodructoRepository : ProdructoRepository,
  ) {}

  @post('/prodructos')
  @response(200, {
    description: 'Prodructo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prodructo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodructo, {
            title: 'NewProdructo',
            exclude: ['id'],
          }),
        },
      },
    })
    prodructo: Omit<Prodructo, 'id'>,
  ): Promise<Prodructo> {
    return this.prodructoRepository.create(prodructo);
  }

  @get('/prodructos/count')
  @response(200, {
    description: 'Prodructo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Prodructo) where?: Where<Prodructo>,
  ): Promise<Count> {
    return this.prodructoRepository.count(where);
  }

  @get('/prodructos')
  @response(200, {
    description: 'Array of Prodructo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prodructo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Prodructo) filter?: Filter<Prodructo>,
  ): Promise<Prodructo[]> {
    return this.prodructoRepository.find(filter);
  }

  @patch('/prodructos')
  @response(200, {
    description: 'Prodructo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodructo, {partial: true}),
        },
      },
    })
    prodructo: Prodructo,
    @param.where(Prodructo) where?: Where<Prodructo>,
  ): Promise<Count> {
    return this.prodructoRepository.updateAll(prodructo, where);
  }

  @get('/prodructos/{id}')
  @response(200, {
    description: 'Prodructo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prodructo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prodructo, {exclude: 'where'}) filter?: FilterExcludingWhere<Prodructo>
  ): Promise<Prodructo> {
    return this.prodructoRepository.findById(id, filter);
  }

  @patch('/prodructos/{id}')
  @response(204, {
    description: 'Prodructo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prodructo, {partial: true}),
        },
      },
    })
    prodructo: Prodructo,
  ): Promise<void> {
    await this.prodructoRepository.updateById(id, prodructo);
  }

  @put('/prodructos/{id}')
  @response(204, {
    description: 'Prodructo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() prodructo: Prodructo,
  ): Promise<void> {
    await this.prodructoRepository.replaceById(id, prodructo);
  }

  @del('/prodructos/{id}')
  @response(204, {
    description: 'Prodructo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.prodructoRepository.deleteById(id);
  }
}
