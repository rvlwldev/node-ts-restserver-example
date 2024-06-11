import env from '@/configurations/Environment';
import IntranetDatabase from '@/databases/Database';

export default new (class CUG_Model extends IntranetDatabase {
	constructor() {
		super(env.DATABASE_CUG);
	}

	async connect() {
		if (this.isConnected()) return this;
		return await super.initialize().then(() => this);
	}
})();
