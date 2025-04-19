import { ModelFactory } from '@api/factory/ModelFactory';
import { IncomeTransaction, OutcomeTransaction } from '@types';
import rawData from '../api/mockup/data.json';
import { SheetDataModel } from './model/Sheet';

// TODO recuperer les data d'une DB
const records = ModelFactory.createTransactionRecord(
	rawData as unknown as Array<IncomeTransaction | OutcomeTransaction>
);
const sheet = new SheetDataModel(records);

export default sheet;
