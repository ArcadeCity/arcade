module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
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
            '.stories.tsx',
          ],
          alias: {
            lib: './src/lib',
            navigation: './src/navigation',
            views: './src/views',
          },
        },
      ],
    ],
  }
}
