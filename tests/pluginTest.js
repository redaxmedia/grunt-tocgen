const expect = require('chai').expect;
const fs = require('fs');
const exec = require('child_process').exec;

describe('tocgen', () =>
{
	it('generate toc', done =>
	{
		exec('grunt tocgen:css', (error, stdout) =>
		{
			const output = fs.readFileSync(__dirname + '/provider/output.css', 'utf8');
			const temp = fs.readFileSync(__dirname + '/provider/temp.css', 'utf8');

			fs.unlinkSync(__dirname + '/provider/temp.css');
			expect(stdout).to.match(/tests\/provider\/input.css > tests\/provider\/temp.css/);
			expect(output).to.equal(temp);
			done();
		});
	});
});
