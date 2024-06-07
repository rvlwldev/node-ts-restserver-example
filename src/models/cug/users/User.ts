import repo from 'databases/CUG';

import { User } from 'models/Types';

class UserModel {
	async findUserWithPassword(id: string, pw: string): Promise<User> {
		const SQL = `
        SELECT man.jumin_log        AS jumin_log,
               man.jumin            AS jumin,
               man.name             AS name,
               man.id               AS id,
               man.email            AS email,
               table_map.tbname     AS my_table,
               man.admin_check      AS admin_check,
               man.sosok            AS sosok,
               man.m_code           AS m_code,
               man.pic_exe          AS pic_exe,
               man.my_sex           AS my_sex,
               man.my_tel,post      AS my_tel,post,
               man.my_j_code        AS my_j_code,
               post_sub.mng_post    AS post_code,
               admin_post.hr_o_code AS admin_hr_oCode
          FROM cug_man man
          LEFT 
          JOIN cug_confirm_map table_map
            ON man.jumin = table_map.jumin
          LEFT
          JOIN (SELECT jumin_log, mng_post
                  FROM cupgdb.admin_post_sub
                 ORDER BY p_day DESC
                 LIMIT 1) post_sub
            ON man.jumin_log = post_sub.jumin_log
          LEFT
          JOIN cupgdb.admin_post admin_post
            ON post_sub.mng_post = admin_post.post_code 
         WHERE man.id = ?
           AND PASSWORD(?);
        `;

		return repo
			.select<User>(SQL, [id, pw])
			.then((user) => user as User[])
			.then((user) => user[0]);
	}
}

export default new UserModel();
