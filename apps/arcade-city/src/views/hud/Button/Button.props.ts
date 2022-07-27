import { TxKeyPath } from 'i18n'
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import { ButtonPresetNames } from './Button.presets'

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Is this HUD hehehehe
   */
  hud?: boolean

  /**
   * subtle or nah
   */
  subtle?: boolean

  /**
   * Is this a button to close a panel
   */
  panelClose?: boolean

  /**
   * Should the button have a checkmark - and what status
   */
  checked?: boolean

  /**
   * The icon to display if not using `tx`, `text`, or nested components.
   */
  icon?: string | boolean

  /**
   * The icon to display along with the text
   */
  withIcon?: any

  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode
}
