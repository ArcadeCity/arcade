import {
  ViewStyle,
  TouchableOpacityProperties,
  ImageURISource,
} from 'react-native'

export interface MenuButtonProps extends TouchableOpacityProperties {
  /**
   * One of the different types of presets.
   */
  preset?: 'default' | 'condensed'

  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: string

  /**
   * The title text to display if not using `tx` or nested components.
   */
  title?: string

  /**
   * Description text which is looked up via i18n.
   */
  descriptionTx?: string

  /**
   * The description text to display if not using `tx` or nested components.
   */
  description?: string

  /**
   * An optional image source for an image on the left side.
   */
  image?: ImageURISource

  /**
   * An optional style override for the button's TouchableOpacity.
   */
  style?: ViewStyle

  /**
   * A flag to hide the border bottom.
   */
  last?: boolean

  children?: any
}
