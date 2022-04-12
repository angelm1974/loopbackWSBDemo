import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Kontakt} from '../models';
import {KontaktRepository} from '../repositories';

@authenticate('jwt')
export class KontaktController {
  constructor(
    @repository(KontaktRepository)
    public kontaktRepository: KontaktRepository,
  ) { }

  @post('/kontakty')
  @response(200, {
    description: 'Kontakt model instance',
    content: {'application/json': {schema: getModelSchemaRef(Kontakt)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Kontakt, {
            title: 'NewKontakt',
            exclude: ['id'],
          }),
        },
      },
    })
    kontakt: Omit<Kontakt, 'id'>,
  ): Promise<Kontakt> {
    return this.kontaktRepository.create(kontakt);
  }

  @authenticate.skip()
  @get('/kontakty/count')
  @response(200, {
    description: 'Kontakt model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Kontakt) where?: Where<Kontakt>,
  ): Promise<Count> {
    return this.kontaktRepository.count(where);
  }

  @get('/kontakty')
  @response(200, {
    description: 'Array of Kontakt model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Kontakt, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Kontakt) filter?: Filter<Kontakt>,
  ): Promise<Kontakt[]> {
    return this.kontaktRepository.find(filter);
  }

  @patch('/kontakty')
  @response(200, {
    description: 'Kontakt PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Kontakt, {partial: true}),
        },
      },
    })
    kontakt: Kontakt,
    @param.where(Kontakt) where?: Where<Kontakt>,
  ): Promise<Count> {
    return this.kontaktRepository.updateAll(kontakt, where);
  }

  @get('/kontakty/{id}')
  @response(200, {
    description: 'Kontakt model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Kontakt, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Kontakt, {exclude: 'where'}) filter?: FilterExcludingWhere<Kontakt>
  ): Promise<Kontakt> {
    return this.kontaktRepository.findById(id, filter);
  }

  @patch('/kontakty/{id}')
  @response(204, {
    description: 'Kontakt PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Kontakt, {partial: true}),
        },
      },
    })
    kontakt: Kontakt,
  ): Promise<void> {
    await this.kontaktRepository.updateById(id, kontakt);
  }

  @put('/kontakty/{id}')
  @response(204, {
    description: 'Kontakt PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() kontakt: Kontakt,
  ): Promise<void> {
    await this.kontaktRepository.replaceById(id, kontakt);
  }

  @del('/kontakty/{id}')
  @response(204, {
    description: 'Kontakt DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.kontaktRepository.deleteById(id);
  }
}
