const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = createJestConfig(config);
