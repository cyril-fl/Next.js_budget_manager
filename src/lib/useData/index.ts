import { Database } from '@/lib/useData/controllers/Database';

const instance = await Database.getInstance();
await instance.init();
export default instance.db;

// import { DataRepository } from './factories/DataRepository';
// import { ModelFactory } from './factories/ModelFactory';
// import rawData from './mockup/data.json';
// import { UnknownTransaction } from './types';

// TODO recuperer les data d'une DB
/*
const records = ModelFactory.createTransactionRecordList(
	rawData as unknown as Array<UnknownTransaction>
);
const data = new DataRepository(records);

export default data;
*/
