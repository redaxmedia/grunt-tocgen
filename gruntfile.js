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
				dest: 'tests/provider/output.css',
				options:
				{
					tag:
					{
						toc: 'tableofcontents',
						section: 'section',
					},
					indent: ' ',
					divider: '.',
					newline: '\n'
				}
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
