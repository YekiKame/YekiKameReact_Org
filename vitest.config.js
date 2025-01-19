// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './setupTests.js',
    globals: true,        // Enable globals like `describe`, `it`, and `expect`
    environment: 'jsdom', // Use jsdom for browser-like environment for React components
    coverage: {
      provider: "istanbul", // or "istanbul"
      reporter: ["text", "lcov"], // Output formats
      include: ["src/**/*.{js,jsx,ts,tsx}"], // Files to include
      exclude: ["node_modules", "dist"], // Files to exclude
    },
    // setupFiles: './setupTests.js', // Path to the setup file for testing libraries
    testTimeout: 15000, // Increase global test timeout to 15 seconds
    mockReset: true, // Reset mocks between tests
  },
  resolve: {
    alias: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS/SCSS Modules
      '\\.module\\.css$': './__mocks__/styleMock.js', // Additional style mock
    },
  },
});
