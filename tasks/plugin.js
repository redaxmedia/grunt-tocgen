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

	let status = false;
	let output = '/**' + optionArray.newline + ' * @' + optionArray.tag.toc + optionArray.newline + ' *' + optionArray.newline;

	/* process parser */

	parserArray.forEach(parserValue =>
	{
		parserValue.tags.forEach(tagValue =>
		{
			if (tagValue.tag === optionArray.tag.section)
			{
				status = true;
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
	return status ? output : content;
}

/**
 * process
 *
 * @since 1.0.0
 *
 * @param source string
 * @param target string
 */

function _process(source, target)
{
	const content = _render(grunt.file.read(source));

	if (content)
	{
		grunt.log.success(target ? source + ' > ' + target : source);
		grunt.file.write(target, content);
	}
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
		if (fileValue.dest)
		{
			_process(fileValue.src, fileValue.dest);
		}
		else
		{
			fileValue.src.forEach(sourceValue =>
			{
				_process(sourceValue, sourceValue);
			});
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