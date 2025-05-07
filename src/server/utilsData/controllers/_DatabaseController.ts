// Import
import { useConsole } from '@/.debug/hooks/useConsole';
import { assert } from '@core';
import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { config } from '../..//config';
// Data
// eslint-disable-next-line react-hooks/rules-of-hooks
const Console = useConsole();

const MONGODB_URL = config.mongo?.url;
const MONGODB_NAME = config.mongo?.name;
assert<string>(MONGODB_URL, 'MONGODB_URL is not defined');
assert<string>(MONGODB_NAME, 'MONGODB_URL is not defined');

let _instance: DatabaseController | undefined;

// Class
export class DatabaseController {
	private _client: MongoClient | null = null;
	protected _db: Db | null = null;

	private constructor() {}

	public static async getInstance(): Promise<DatabaseController> {
		if (!_instance) {
			_instance = new DatabaseController();
			await _instance.connect();
		}
		return _instance;
	}

	public get db(): Db {
		this.assertDb();
		return this._db;
	}

	// Methods
	private async connect(): Promise<void> {
		if (this._client) return;
		// TODO: remplacer par un ajout dans la collection LOG en DB timestamp
		Console.log('🥭 Connecting to MongoDB...');

		try {
			const options: MongoClientOptions = {};

			this._client = await MongoClient.connect(MONGODB_URL ?? '', options);
			this._db = this._client.db(MONGODB_NAME);

			Console.log('✅ MongoDB connected.');
		} catch (err) {
			Console.error('❌ Erreur de connexion à MongoDB:', err);
			process.exit(1);
		}
	}
	public async init(): Promise<void> {
		await this.ensureCollectionExists('transactions');
		Console.log('✅ MongoDB collections initialized.');
	}
	public async close(): Promise<void> {
		if (!this._client) return;

		await this._client.close();
		this._client = null;
		this._db = null;
		Console.log('🥭 MongoDB connection closed.');
	}
	protected assertDb(): asserts this is this & { _db: Db } {
		if (!this._db) throw new Error('⚠️ The database is not connected.');
	}
	private async ensureCollectionExists(name: string): Promise<void> {
		this.assertDb();

		const collections = await this._db
			.listCollections({}, { nameOnly: true })
			.toArray();

		const exists = collections.some((c) => c.name === name);
		if (exists) return;

		await this._db.createCollection(name);
		Console.log(`✅ Collection ${name} created.`);
	}
}
