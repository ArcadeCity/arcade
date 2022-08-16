import React from 'react'
import { View } from 'react-native'
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web'

export default function App() {
  return (
    <WithSkiaWeb
      opts={{
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@0.35.0/bin/full/${file}`,
      }}
      getComponent={async () => await import('app/features/home/screen')}
      fallback={<View style={{ flex: 1, backgroundColor: '#000' }} />}
    />
  )
}
