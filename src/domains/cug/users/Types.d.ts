import { SelectResult } from '@/databases/Types';

export interface User extends SelectResult {
	jumin_log: string;
	jumin: string;
	name: string;
	id: string;
	email: string;
	my_table: string;
	admin_check: string;
	sosok: string;
	m_code: string;
	pic_exe: string;
	my_sex: string;
	my_tel: string;
	my_j_code: string;
	post_code: string;
	admin_hr_oCode: string;
}
