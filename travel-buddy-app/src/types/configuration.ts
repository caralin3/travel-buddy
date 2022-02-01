export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  REACT_APP_API_URL: string;
  REACT_APP_API_VERSION: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export interface CommonConfiguration {
  env: 'development' | 'production' | 'test';
  apiUrl: string;
  apiVersion: string;
}

export interface CompileTimeConfiguration extends CommonConfiguration {}

export interface RuntimeConfiguration extends Pick<CommonConfiguration, 'env'> {}
