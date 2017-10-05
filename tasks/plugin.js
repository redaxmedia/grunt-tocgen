const grunt = require('grunt');
const extend = require('extend');
const parser = require('comment-parser');
const packageArray = require('../package.json');

let optionArray = require('../option.json');

/**
 * render
 *
 * @since 1.0.0
 *
 * @param content string
 *
 * @return string
 */

function _render(content)
{
	const parserArray = parser(content);

	let output = '/**' + optionArray.newline + ' * @' + optionArray.tag.toc + optionArray.newline + ' *' + optionArray.newline;

	/* process parser */

	parserArray.forEach(parserValue =>
	{
		parserValue.tags.forEach(tagValue =>
		{
			if (tagValue.tag === optionArray.tag.section)
			{
				output += ' *' + optionArray.indent.repeat(tagValue.name.length - 1);
				output += tagValue.name + optionArray.indent + tagValue.description + optionArray.newline;
			}
			if (tagValue.tag === optionArray.tag.toc)
			{
				const raw = '/**' + optionArray.newline + ' * ' + parserValue.source.split(optionArray.newline)
						.join(optionArray.newline + ' * ')
						.replace(optionArray.newline + ' * ', optionArray.newline + ' *') + optionArray.newline + ' */';

				content = content.replace(raw, '').replace(optionArray.newline.repeat(2), '');
			}
		});
	});
	output += ' */' + optionArray.newline.repeat(2) + content;
	return output;
}

/**
 * init
 *
 * @since 1.0.0
 */

function init()
{
	optionArray = extend(optionArray, this.options());

	/* process files */

	this.files.forEach(fileValue =>
	{
		const content = fileValue.src.filter(path =>
		{
			return grunt.file.exists(path);
		})
		.map(path =>
		{
			return _render(grunt.file.read(path));
		})
		.join(optionArray.newline);

		/* write content */

		if (content.length)
		{
			grunt.log.success(fileValue.src + ' > ' + fileValue.dest);
			grunt.file.write(fileValue.dest, content);
		}
	});
}

/**
 * construct
 *
 * @since 1.0.0
 *
 * @param grunt object
 *
 * @return object
 */

function construct(grunt)
{
	grunt.registerMultiTask('tocgen', packageArray.description, init);
}

module.exports = construct;