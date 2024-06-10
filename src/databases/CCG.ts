import env from '@/configurations/Environment';
import IntranetDatabase from '@/databases/Database';

export default new (class CCG_Model extends IntranetDatabase {
	constructor() {
		super(env.DATABASE_CCG);
	}

	async connect() {
		if (this.isConnected()) return this;
		return await super.initialize().then(() => this);
	}
})();
