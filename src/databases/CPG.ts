import env from '@/configurations/Environment';
import IntranetDatabase from '@/databases/Database';

export default new (class CPG_Model extends IntranetDatabase {
	constructor() {
		super(env.DATABASE_CPG);
	}

	async connect() {
		if (this.isConnected()) return this;
		return await super.initialize().then(() => this);
	}
})();
