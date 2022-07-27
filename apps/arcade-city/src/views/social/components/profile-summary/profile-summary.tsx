import * as React from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'
import { Avatar, Text } from 'views/shared'
import { color, spacing } from 'views/theme'

// Or just pass a player object...?
interface Props {
  avatar?: any
  bio: string | null
  city: string | null
  forOnPress?: any
  identityVerified?: boolean
  level: number | null
  locale?: string | null
  profession: string | null
  username: string | null
}

/**
 * A brief overview of a user's profile with avatar, name, username, and member since.
 */
export const ProfileSummary = ({
  avatar,
  bio,
  city,
  forOnPress,
  identityVerified,
  level,
  profession,
  username,
}: Props) => {
  const levelAndClass = `Level ${level} ${profession}`

  return (
    <View style={ROOT}>
      <Avatar
        preset='s96x96'
        // preset='s138x200'
        uri={avatar}
        forOnPress={forOnPress}
        activeOpacity={1}
      />
      <View style={DETAILS}>
        <Text preset='title' text={username} style={NAME} />
        <Text
          preset='bold'
          text={levelAndClass}
          style={{ marginVertical: 6 }}
        />
        <Text preset='description' text={city} style={{ marginBottom: 6 }} />
        {identityVerified && (
          <Text preset='descriptionSlim' tx='social.identityVerified' />
        )}
        <View style={DIVIDER} />
        <Text preset='descriptionSlim' text={bio} />
      </View>
    </View>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  paddingTop: spacing[4],
  paddingBottom: spacing[5],
}

const DETAILS: ViewStyle = {
  justifyContent: 'flex-end',
  flex: 1,
  paddingLeft: spacing[4],
}

const NAME: TextStyle = {
  marginVertical: 0,
}

const DIVIDER: ViewStyle = {
  backgroundColor: color.line,
  height: 1,
  marginBottom: spacing[2],
  marginTop: spacing[2],
  width: spacing[4],
}
