export const apps = [
	{
		name: 'ts-intranet-server',
		script: './build/App.js',
		instances: 2,
		watch: true,
		ignore_watch: [
			'node_modules',
			'temp', // 임시파일 (언젠가 쓸꺼같아서 ... )
			'logs',
			'.*', // 환경변수 및 설정
			'*.json',
			'App.run.js'
		],
		exec_mode: 'cluster',
		error_file: './logs/error.log'
	}
];
