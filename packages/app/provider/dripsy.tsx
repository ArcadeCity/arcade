import { DripsyProvider, makeTheme } from 'dripsy'

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    a: {
      color: '#fff',
    },
    p: {
      color: '#fff',
      fontSize: 16,
    },
    h1: {
      color: '#fff',
      fontSize: 36,
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
