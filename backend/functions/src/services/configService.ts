type Config = {
  mongo: {
    uri: string;
    dbName: string;
    tls: boolean;
  };
};

export class ConfigService {
  private config: Config | null = null;

  /**
   * @note - in an ideal setup, there will be multiple configurations for different environments and the credentials will be stored in a secure way
   */
  getConfig = (): Config => {
    if (this.config) {
      return this.config;
    }

    const config = {
      mongo: {
        uri: `mongodb://dbuser:password123@localhost:27019/?authSource=admin`,
        dbName: 'reco-technical-test',
        tls: false
      }
    };

    this.config = config;

    return config;
  };
}

let instance: ConfigService;

export const getConfigService = () => {
  if (!instance) {
    instance = new ConfigService();
  }

  return instance;
};
