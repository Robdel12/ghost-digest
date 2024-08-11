import { server } from './server';
import { afterAll, afterEach, beforeAll } from 'vitest';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared in a test.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
