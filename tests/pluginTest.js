const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('tocgen', () =>
{
	it('generate toc', done =>
	{
		exec('grunt tocgen:css', (error, stdout) =>
		{
			expect(stdout).to.match(/tests\/provider\/input.css > tests\/provider\/output.css/);
			done();
		});
	});
});
