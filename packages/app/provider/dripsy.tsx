import { DripsyProvider, makeTheme } from 'dripsy'
import { palette } from '../../ui/src/index'

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    a: {
      color: palette.moonRaker,
    },
    p: {
      color: palette.blueBell,
      fontSize: 16,
    },
    h1: {
      color: palette.moonRaker,
      fontSize: 32,
    },
  },
})

export function Dripsy({ children }: { children: React.ReactNode }) {
  return (
    <DripsyProvider
      theme={theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
      ssr>
      {children}
    </DripsyProvider>
  )
}
