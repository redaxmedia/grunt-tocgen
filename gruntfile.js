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
			successWithOption:
			{
				src:
				[
					'tests/provider/input_with_option.css'
				],
				dest: 'tests/provider/temp_with_option.css',
				options:
				{
					tags:
					{
						toc: 'tableofcontents__',
						section: 'section__'
					}
				}
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
