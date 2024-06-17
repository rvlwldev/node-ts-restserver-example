import { SelectResult } from '@common/types';

export interface User extends SelectResult {
	jumin: string;
	jumin_log: string;
	name: string;
	email: string;
	id: string;
	passwd: string;
	level: number;
	login_log: string;
	inout_date: Date;
	history: string;
	pic_exe: string;
	gubun_ab: string;
	p_day: Date;
}
