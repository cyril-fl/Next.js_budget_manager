import { DatabaseController } from '@/server/utilsData';

const instance = await DatabaseController.getInstance();
await instance.init();
export default instance.db;
