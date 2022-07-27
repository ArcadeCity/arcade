import React, { useEffect, useState } from 'react'
import { getStorybookUI, configure } from '@storybook/react-native'
import { initFonts } from 'views/theme'
import './rn-addons.ts'

declare let module

configure(() => {
  require('./storybook-registry')
}, module)

const StorybookUI = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage:
    require('@react-native-async-storage/async-storage').default || null,
})

export function StorybookUIRoot() {
  // const [storybookReady, setStorybookReady] = useState(false)
  useEffect(() => {
    ;(async () => {
      await initFonts() // expo only
      // @ts-ignore
      if (typeof __TEST__ === 'undefined' || !__TEST__) {
        const Reactotron = require('../src/services/reactotron')
        const reactotron = new Reactotron.Reactotron()
        reactotron.setup()
      }
      // setStorybookReady(true)
    })()
  }, [])

  return <StorybookUI />
  // return storybookReady ? <StorybookUI /> : null
}
