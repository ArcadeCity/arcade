import { Platform, ViewStyle } from 'react-native'
import { color } from '../../theme'

const shadow = (height: number, shadowRadius: number) =>
  Platform.select({
    ios: {
      shadowColor: color.shadow,
      shadowOffset: {
        width: 0,
        height,
      },
      shadowOpacity: 1,
      shadowRadius,
    },
    // android: {  TODO: Figure out why this causes typescript error
    //   elevation: 5,
    // },
  })

const BASE_CONTAINER: ViewStyle = {
  backgroundColor: 'transparent',
  borderRadius: 4,
}

export const avatarContainerPreset: any = {
  s276x400: {
    ...BASE_CONTAINER,
    width: 276,
    height: 400,
    ...shadow(10, 20),
  },
  s254x254: {
    ...BASE_CONTAINER,
    width: 254,
    height: 254,
    ...shadow(10, 20),
  },
  s138x200: {
    ...BASE_CONTAINER,
    width: 138,
    height: 200,
    ...shadow(9, 18),
  } as ViewStyle,
  s104x128: {
    ...BASE_CONTAINER,
    width: 104,
    height: 128,
    ...shadow(9, 18),
  } as ViewStyle,
  s96x96: {
    ...BASE_CONTAINER,
    width: 96,
    height: 96,
    ...shadow(2, 4),
  } as ViewStyle,
  s64x64: {
    ...BASE_CONTAINER,
    width: 64,
    height: 64,
    ...shadow(2, 4),
  } as ViewStyle,
  s48x48: {
    ...BASE_CONTAINER,
    width: 48,
    height: 48,
    ...shadow(2, 4),
  } as ViewStyle,
  s32x32: {
    ...BASE_CONTAINER,
    width: 32,
    height: 32,
    ...shadow(2, 4),
  } as ViewStyle,
  s24x24: {
    ...BASE_CONTAINER,
    width: 24,
    height: 24,
    ...shadow(2, 4),
  },
}

/**
 * A list of preset names.
 */
export type AvatarPresetNames = keyof typeof avatarContainerPreset
