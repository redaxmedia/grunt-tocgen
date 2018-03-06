module.exports = grunt =>
{
	'use strict';

	/* config grunt */

	grunt.initConfig(
	{
		tocgen:
		{
			success:
			{
				src:
				[
					'tests/provider/input.css'
				],
				dest: 'tests/provider/temp.css'
			},
			error:
			{
				src:
				[
					'tests/provider/output.css'
				],
				dest: 'tests/provider/temp.css'
			}
		}
	});

	/* load tasks */

	grunt.loadTasks('tasks');

	/* register tasks */

	grunt.registerTask('default',
	[
		'tocgen'
	]);
};
