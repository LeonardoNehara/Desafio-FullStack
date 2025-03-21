module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Transforma arquivos .js e .jsx
      "^.+\\.mjs$": "babel-jest",  // Transforma arquivos .mjs (se necessário)
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/", // Permite que o axios seja transformado
    ],
    setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect',
    ],
  };
  