import { vi, describe, it, expect, beforeEach } from 'vitest';

process.env.GHOST_API_KEY = 'a1b2c3d4e5f6078901234567890abcdef:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

let logs = '';
let run;
let period = 'daily';

describe('GitHub Action', () => {
	beforeEach(async () => {
		logs = '';

		vi.resetModules();
		vi.doMock(import('@actions/core'), async (importOriginal) => {
			let original = await importOriginal();

			return {
				...original,
				getInput: vi.fn((name) => {
					if (name === 'url') return 'https://example.com';
					if (name === 'period') return period;
					if (name === 'tags') return 'Digest';
					if (name === 'timezone') return 'America/Chicago';

					return '';
				}),
				getBooleanInput: vi.fn(() => true),
				debug: vi.fn((log) => (logs += log + '\n'))
			};
		});
	});

	it('should generate a digest correctly', async () => {
		({ run } = await import('../index.js'));
		await run();

		expect(logs).toContain('Generating daily digest');
		expect(logs).toContain('Processing post: Test Post 1');
		expect(logs).toContain('Processing post: Test Post 2');
		expect(logs).toContain('Creating newsletter post...');
	});

	it('should generate a weekly digest correctly', async () => {
		period = 'weekly';
		({ run } = await import('../index.js'));
		await run();

		expect(logs).toContain('Generating weekly digest');
		expect(logs).toContain('Processing post: Test Post 1');
		expect(logs).toContain('Processing post: Test Post 2');
		expect(logs).toContain('Creating newsletter post...');
	});
});
