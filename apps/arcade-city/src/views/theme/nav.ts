import { color } from '@arcadecity/ui'
import { DarkTheme } from '@react-navigation/native'

export const navTheme = {
  colors: {
    ...DarkTheme.colors,
    background: color.background,
  },
  dark: true,
}
