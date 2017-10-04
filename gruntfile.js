module.exports = grunt =>
{
	'use strict';

	/* config grunt */

	grunt.initConfig(
	{
		tocgen:
		{
			css:
			{
				src:
				[
					'tests/provider/input.css'
				],
				dest: 'tests/provider/output.css'
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
