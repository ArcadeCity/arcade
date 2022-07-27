export interface AvatarProps {
  /**
   * Optional activeOpacity passthrough
   */
  activeOpacity?: number

  /**
   * The image uri.
   */
  uri?: string | null

  /**
   * An optional style override for avatar image container.
   */
  style?: any

  /**
   * One of the different types of avatars.
   */
  preset?: any

  /**
   * Avatar for a guild? Changes default image
   */
  guild?: boolean

  /**
   * Passthrough function for onPress
   */
  forOnPress?: any
}
