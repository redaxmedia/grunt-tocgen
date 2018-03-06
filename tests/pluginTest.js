const expect = require('chai').expect;
const fs = require('fs');
const exec = require('child_process').exec;

describe('tocgen', () =>
{
	it('success', done =>
	{
		exec('grunt tocgen:success', (error, stdout) =>
		{
			const output = fs.readFileSync('tests/provider/output.css', 'utf8');
			const temp = fs.readFileSync('tests/provider/temp.css', 'utf8');

			fs.unlinkSync('tests/provider/temp.css');
			expect(stdout).to.match(/tests\/provider\/input.css > tests\/provider\/temp.css/);
			expect(output).to.equal(temp);
			done();
		});
	});

	it('error', done =>
	{
		exec('grunt tocgen:error', (error, stdout) =>
		{
			expect(stdout).to.match(/tests\/provider\/output.css === tests\/provider\/temp.css/);
			done();
		});
	});
});
