Grunt Tocgen
============

> Grunt enhanced table of contents generator.

[![Build Status](https://img.shields.io/travis/redaxmedia/grunt-tocgen.svg)](https://travis-ci.org/redaxmedia/grunt-tocgen)
[![Dependency Status](https://gemnasium.com/badges/github.com/redaxmedia/grunt-tocgen.svg)](https://gemnasium.com/github.com/redaxmedia/grunt-tocgen)
[![NPM Version](https://img.shields.io/npm/v/grunt-tocgen.svg)](https://www.npmjs.com/package/grunt-tocgen)
[![GitHub Stats](https://img.shields.io/badge/github-stats-ff5500.svg)](http://githubstats.com/redaxmedia/grunt-tocgen)


Installation
------------

```
npm install grunt-tocgen
```


Usage
-----

Load the task:

```
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
				'styles/**.css'
			],
			options:
			{
				tag:
				{
					toc: 'tableofcontents',
					section: 'section'
				},
				indent: ' ',
				newline: '\n'
			}
		}
	}
}
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
