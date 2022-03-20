import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  collectCoverage: true,
  coverageDirectory: './build',
  coverageReporters: ['json', 'lcov'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
};

module.exports = async () => config;
