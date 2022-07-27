import { TextStyle, ViewStyle } from 'react-native'
import { color, palette, spacing } from 'views/theme'

/**
 * All buttons will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  alignSelf: 'stretch',
  minHeight: 50,
  minWidth: 120,
  alignItems: 'center',
  justifyContent: 'center',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 1,
  shadowRadius: 12,

  borderWidth: 1,
  borderColor: '#01F7F8',
}

const SMALL_VIEW: ViewStyle = {
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
}

const SMALLER_VIEW: ViewStyle = {
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',
  height: 26,
}

const DISABLED_VIEW: ViewStyle = {
  ...BASE_VIEW,
  opacity: 0.6,
}

const BASE_TEXT: TextStyle = {
  color: palette.arwes,
  textAlign: 'center',
  paddingHorizontal: spacing[3],
  fontSize: 18,
  lineHeight: 28,
  fontFamily: 'titillium-bold',
}

/**
 * All the variations of button styling within the app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  primary: {
    ...BASE_VIEW,
    // backgroundColor: color.primary,
    backgroundColor: 'rgba(6,61,62,0.8)',
    shadowColor: 'rgba(6,61,62, 0.3)',
  } as ViewStyle,
  secondary: {
    ...BASE_VIEW,
    backgroundColor: 'rgba(6,61,62,0.1)', // color.secondary,
    shadowColor: 'rgba(120, 101, 182, 0.12)',
  } as ViewStyle,
  purpleglow: {
    ...BASE_VIEW,
    backgroundColor: color.origin,
    shadowColor: 'rgba(255, 0, 255, 0.32)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  } as ViewStyle,
  icon: {
    borderRadius: 23,
    minHeight: 46,
    minWidth: 46,
    height: 46,
    width: 46,
    padding: 0,
  } as ViewStyle,
  small: {
    ...SMALL_VIEW,
  } as ViewStyle,
  smaller: {
    ...SMALLER_VIEW,
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: {
    ...BASE_TEXT,
    letterSpacing: 1,
  } as TextStyle,
  secondary: {
    ...BASE_TEXT,
    color: 'rgba(0,248,248,0.8)', // palette.arwesSecondary,
  } as TextStyle,
}

/**
 * What the base view looks like when disabled.
 */
export const disabledViewPresets = {
  primary: {
    ...DISABLED_VIEW,
    // backgroundColor: color.primary,
    backgroundColor: 'rgba(6,61,62,0.5)',
  } as ViewStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
