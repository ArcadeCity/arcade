module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            lib: './lib',
            services: './services',
            stores: './stores',
          },
        },
      ],
    ],
  }
}
