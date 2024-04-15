import ormConnection from '@root/database/ormconfig';
import { EntityTarget } from 'typeorm';

export const initDB = async () => {
  if (ormConnection.isInitialized) {
    return ormConnection;
  }
  return ormConnection.initialize();
};

export const buildRepository = <T>(model: EntityTarget<T>) => ormConnection.getRepository<T>(model);
