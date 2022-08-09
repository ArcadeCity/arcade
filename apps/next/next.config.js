/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack5: true,
}

const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'dripsy',
  '@dripsy/core',
  'moti',
  // '@motify/core',
  // '@motify/components',
  'app',
  'ui',
  // 'use-arcade',
  '@arcadecity/use-arcade',
  '@arcadecity/ui',
])

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  nextConfig
)
