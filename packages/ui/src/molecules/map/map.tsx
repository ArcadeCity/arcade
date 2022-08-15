import { palette } from 'ui/src/theme'
import { WebView } from 'react-native-webview'

export const Map = () => {
  return (
    <WebView
      style={{ backgroundColor: palette.haiti, flex: 1 }}
      source={{ uri: 'https://map-demo.arcade.city' }}
    />
  )
}
