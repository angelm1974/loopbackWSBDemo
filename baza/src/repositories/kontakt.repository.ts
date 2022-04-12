import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DaneDataSource} from '../datasources';
import {Kontakt, KontaktRelations} from '../models';

export class KontaktRepository extends DefaultCrudRepository<
  Kontakt,
  typeof Kontakt.prototype.id,
  KontaktRelations
> {
  constructor(
    @inject('datasources.dane') dataSource: DaneDataSource,
  ) {
    super(Kontakt, dataSource);
  }
}
