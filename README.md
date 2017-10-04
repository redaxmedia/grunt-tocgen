Grunt Tocgen
============

> Table of Contents generator for CSS and JavaScript.

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

```
grunt.initConfig(
{
	tocgen:
	{
		name:
		{
			options:
			{
				tag:
				{
					toc: 'tableofcontents',
					section: 'section',
				},
				divider: '.',
				indent: ' ',
				newline: '\n'
			}
		}
	}
}
```
