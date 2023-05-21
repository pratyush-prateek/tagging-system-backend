import { ENV_CONSTANTS } from '@app/common';

export const ENV_VAR_NAMES = {
  PORT: 'port',
  DB_URI: ENV_CONSTANTS.DEFAULT_DB_URI_ENV_VAR,
};

export const USERS_ROUTE = 'api/users';
export const DATA_SOURCES_ROUTE = 'api/users/:userId/data-sources';
export const API_TAGS = {
  DATA_SOURCE: 'DataSource',
  USER: 'User',
};

export const STRINGS = {
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
};
