import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dane',
  connector: 'mongodb',
  url: 'mongodb+srv://uwpisz:hwpisz@cluster0.ajwo5.mongodb.net/baza',
  host: 'cluster0.ajwo5.mongodb.net/baza',
  port: 27017,
  user: 'wpisz',
  password: 'Nwpisz',
  database: 'nazwa',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DaneDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dane';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dane', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
