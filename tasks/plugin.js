const grunt = require('grunt');
const extend = require('extend');
const parser = require('comment-parser');
const packageArray = require('../package.json');

let optionArray = require('../option.json');

/**
 * parse the toc
 *
 * @since 1.0.0
 *
 * @param path string
 * @param optionArray array
 *
 * @return array
 */

function _parseToc(path, optionArray)
{
	const content = grunt.file.read(path);
	const parserArray = parser(content);
	const tocArray = [];

	/* process parser */

	parserArray.forEach(parserValue =>
	{
		parserValue.tags.forEach(tagValue =>
		{
			if (tagValue.tag === optionArray.tag.section)
			{
				tocArray[tagValue.name] = tagValue.description;
			}
		});
	});
	return tocArray;
}
/**
 * render the toc
 *
 * @since 1.0.0
 *
 * @param path string
 * @param optionArray array
 *
 * @return string
 */

function _renderToc(path, optionArray)
{
	const tocArray = _parseToc(path, optionArray);

	let output = '/**' + optionArray.newline + '*' + optionArray.indent + '@' + optionArray.tag.toc + optionArray.newline + '*' + optionArray.newline;

	/* process toc */

	Object.keys(tocArray).forEach(tocValue =>
	{
		if (tocValue)
		{
			const indentArray = tocValue.split(optionArray.divider).filter(value =>
			{
				return value;
			});

			output += '*' + optionArray.indent.repeat(indentArray.length);
			output += tocValue + optionArray.indent + tocArray[tocValue] + optionArray.newline;
		}
	});
	output += '*/' + optionArray.newline.repeat(2);
	return output;
}

/**
 * init
 *
 * @since 1.0.0
 */

function init()
{
	optionArray = extend(optionArray, this.options());;

	let content = null;

	/* process files */

	this.files.forEach(fileValue =>
	{
		content = fileValue.src.filter(path =>
		{
			return grunt.file.exists(path);
		})
		.map(path =>
		{
			return _renderToc(path, optionArray) + grunt.file.read(path);
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