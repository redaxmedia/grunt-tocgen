const grunt = require('grunt');
const DocBlock = require('docblock');
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
	const docBlock = new DocBlock();
	const commentArray = docBlock.parse(content);

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
 * @param source string
 * @param target string
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
 * @param grunt object
 */

function construct(grunt)
{
	grunt.registerMultiTask('tocgen', packageArray.description, init);
}

module.exports = construct;
