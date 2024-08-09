/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/testing/setup-tests.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },
};

export default createJestConfig(config);
