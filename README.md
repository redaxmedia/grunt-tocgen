Grunt Tocgen
============

> Grunt enhanced table of contents generator.

[![Build Status](https://img.shields.io/github/workflow/status/redaxmedia/grunt-tocgen/ci.svg)](https://github.com/redaxmedia/grunt-tocgen/actions?query=workflow:ci)
[![NPM Version](https://img.shields.io/npm/v/grunt-tocgen.svg)](https://npmjs.com/package/grunt-tocgen)
[![Licensen](https://img.shields.io/npm/l/grunt-tocgen.svg)](https://npmjs.com/package/grunt-tocgen)


Installation
------------

```
npm install grunt-tocgen
```


Usage
-----

Load the task:

```js
grunt.loadNpmTasks('grunt-tocgen');
```

Config the task:

```js
grunt.initConfig(
{
	tocgen:
	{
		name:
		{
			src:
			[
				'styles/*.css'
			],
			options:
			{
				tags:
				{
					toc: 'tableofcontents',
					section: 'section'
				},
				indent: ' ',
				newline: '\n'
			}
		}
	}
});
```

Run the task:

```
grunt tocgen
```


Examples
--------

Input file:

```css
/** @section 1. first */

/** @section 1.1 sub */

/** @section 2. second */
```

Output file:

```css
/**
 * @tableofcontents
 *
 * 1. first
 *    1.1 sub
 * 2. second
 */

/** @section 1. first */

/** @section 1.1 sub */

/** @section 2. second */
```
