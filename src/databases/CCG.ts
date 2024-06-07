import env from 'configurations/Env';
import IntranetDatabase from 'databases/Database';

export default new (class CUG_Model extends IntranetDatabase {
	constructor() {
		super(env.DATABASE_CCG);
	}

	async connect() {
		if (this.isConnected()) return this;
		return await super.initialize().then(() => this);
	}
})();
