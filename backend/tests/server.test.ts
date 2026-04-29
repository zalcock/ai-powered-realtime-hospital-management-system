import { describe, it, expect } from 'bun:test';
import { app } from '../src/server'; // adjust path if needed

describe('Backend server', () => {
  it('should export an Express app instance', () => {
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });
});