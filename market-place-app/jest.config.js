module.exports = {
  projects: [
    {
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/utils/**/*.test.ts'], // Ajusta según tu estructura
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
    {
      displayName: 'jsdom',
      preset: 'ts-jest',
      testEnvironment: 'jest-environment-jsdom', // Actualizado para usar el entorno jsdom instalado
      testMatch: ['<rootDir>/src/components/**/*.test.tsx'], // Ajusta según tu estructura
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Para jest-dom
    },
  ],
};