const grunt = require('grunt');
const docblock = require('docblock');
const packageObject = require('../package.json');

let optionArray = require('../option.json');

/**
 * render
 *
 * @since 1.0.0
 *
 * @param {string} content
 *
 * @return {string}
 */

function _render(content)
{
	const DOCBLOCK = new docblock();
	const commentArray = DOCBLOCK.parse(content);

	let status = false;
	let output = '/**' + optionArray.newline + ' * @' + optionArray.tag.toc + optionArray.newline + ' *' + optionArray.newline;

	/* process comment */

	commentArray.forEach(commentValue =>
	{
		Object.keys(commentValue.tags).forEach(tagValue =>
		{
			if (tagValue === optionArray.tag.section)
			{
				const numberArray = commentValue.tags.section.match(/\d/g);

				status = true;
				output += ' *' + optionArray.indent.repeat(numberArray.length === 1 ? 1 : numberArray.length * 2);
				output += commentValue.tags.section + optionArray.newline;
			}
			if (tagValue === optionArray.tag.toc)
			{
				content = content.replace(commentValue.raw, '').replace(optionArray.newline.repeat(2), '');
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
 * @param {string} source
 * @param {string} target
 *
 * @return {void}
 */

function _process(source, target)
{
	const content = grunt.file.read(source);
	const output = _render(content);

	if (content === output)
	{
		grunt.log.error(source + ' === ' + target);
	}
	else
	{
		grunt.log.ok(source + ' > ' + target);
		grunt.file.write(target, output);
	}
}

/**
 * init
 *
 * @since 1.0.0
 *
 * @return {void}
 */

function init()
{
	optionArray =
	{
		...optionArray,
		...this.options()
	};

	/* process files */

	this.files.forEach(fileValue =>
	{
		fileValue.src.forEach(sourceValue =>
		{
			_process(sourceValue, fileValue.dest ? fileValue.dest : sourceValue);
		});
	});
}

/**
 * construct
 *
 * @since 1.0.0
 *
 * @param {object} grunt
 *
 * @return {void}
 */

function construct(grunt)
{
	grunt.registerMultiTask('tocgen', packageObject.description, init);
}

module.exports = construct;
