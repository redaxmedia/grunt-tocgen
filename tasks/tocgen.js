const grunt = require('grunt');
const docblock = require('docblock');
const option = require('utility-redaxmedia').option(__dirname + '/../option.json');
const packageObject = require('../package.json');

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

	let doUpdate = false;
	let output = '/**' + option.get('newline') + ' * @' + option.get('tags').toc + option.get('newline') + ' *' + option.get('newline');

	/* process comment */

	commentArray.forEach(commentValue =>
	{
		Object.keys(commentValue.tags).forEach(tagValue =>
		{
			if (tagValue === option.get('tags').section)
			{
				const numberArray = commentValue.tags[tagValue].match(/\d/g);

				doUpdate = true;
				output += ' *' + option.get('indent').repeat(numberArray.length === 1 ? 1 : numberArray.length * 2);
				output += commentValue.tags[tagValue] + option.get('newline');
			}
			if (tagValue === option.get('tags').toc)
			{
				content = content.replace(commentValue.raw, '').replace(option.get('newline').repeat(2), '');
			}
		});
	});
	output += ' */' + option.get('newline').repeat(2) + content;
	return doUpdate ? output : content;
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
		grunt.log.error(source + ' !== ' + target);
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
	option.init(this.options());

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
