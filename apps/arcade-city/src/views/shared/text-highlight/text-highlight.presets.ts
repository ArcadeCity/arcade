import { Platform, TextStyle, ViewStyle } from 'react-native'
import { color } from '../../theme'

const SMALL_VIEW: ViewStyle = {
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
}

/**
 * What the base view looks like.
 */
export const viewPresets = {
  small: {
    ...SMALL_VIEW,
  } as ViewStyle,
} as any

/**
 * What the text looks like.
 */
export const textPresets = {
  small: {
    backgroundColor: color.background,
    borderRadius: 2,
    margin: 0,
    paddingHorizontal: 10,
    ...Platform.select({
      android: {
        paddingVertical: 0, // height: 28, TODO: Figure out why I can't define height here (typescript error).. and does this screw up the look on android
      },
      ios: {
        paddingVertical: 0,
      },
    }),
  } as TextStyle,
} as any
