import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strictObjectIDCoercion: true
  }
})
export class Kontakt extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'}
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  miasto: string;

  @property({
    type: 'string',
    required: true,
  })
  nazwiskoImie: string;

  @property({
    type: 'string',
    required: true,
  })
  telefon: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;


  constructor(data?: Partial<Kontakt>) {
    super(data);
  }
}

export interface KontaktRelations {
  // describe navigational properties here
}

export type KontaktWithRelations = Kontakt & KontaktRelations;
