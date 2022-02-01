import { CompileTimeConfiguration } from './types/configuration';

const config: CompileTimeConfiguration = {
  env: process.env.NODE_ENV,
  apiUrl: process.env.REACT_APP_API_URL,
  apiVersion: process.env.REACT_APP_API_VERSION,
};

export default config;
