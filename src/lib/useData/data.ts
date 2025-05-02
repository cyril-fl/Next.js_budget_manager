import { DataRepository } from '@/factories/DataRepository';
import { ModelFactory } from '@/factories/ModelFactory';
import { UnknownTransaction } from '@types';
import rawData from './mockup/d-data.json';

// TODO recuperer les data d'une DB
const records = ModelFactory.createTransactionRecordList(
	rawData as unknown as Array<UnknownTransaction>
);
const data = new DataRepository(records);

export default data;
