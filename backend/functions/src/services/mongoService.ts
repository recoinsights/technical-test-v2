import mongoose from 'mongoose';
import { ConfigService, getConfigService } from './configService';
import { isNil } from 'lodash';
import { SurveyModel } from 'src/models/survey';

export class MongoService {
  private configService: ConfigService;
  private static client: typeof mongoose | undefined;
  private config: ReturnType<ConfigService['getConfig']>;

  constructor() {
    this.configService = getConfigService();
    this.config = this.configService.getConfig();
  }

  public connect = async () => {
    if (this.isConnected()) {
      return;
    }

    mongoose.set('strictQuery', true);
    MongoService.client = await mongoose.connect(this.config.mongo.uri, {
      // tls: config.database.mongo.tls, @todo: configure tls
      dbName: this.config.mongo.dbName,
      // and tell the MongoDB driver to not wait more than 5 seconds
      // before erroring out if it isn't connected
      // consider moving this into the env/ config variable in the future.
      serverSelectionTimeoutMS: 5000,
      // automatically close your connections after 1 minute of idle time.
      maxIdleTimeMS: 60000
    });
  };

  public close = async () => {
    if (!this.isConnected()) {
      return;
    }

    await mongoose.connection.close();
    MongoService.client = undefined;
  };

  public isConnected = () => {
    return !isNil(MongoService.client);
  };

  public prune = async (): Promise<void> => {
    if (!this.isConnected()) {
      return;
    }
    await SurveyModel.deleteMany({});
  };
}

let instance: MongoService;

export const getMongoService = () => {
  if (!instance) {
    instance = new MongoService();
  }

  return instance;
};
