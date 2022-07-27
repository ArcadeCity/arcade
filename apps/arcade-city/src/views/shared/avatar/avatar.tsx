import * as React from 'react'
import { Image, ImageStyle, TouchableOpacity, View } from 'react-native'
import { images } from 'views/theme'
import { AvatarProps } from './'
import { avatarContainerPreset } from './avatar.presets'

const AVATAR: ImageStyle = {
  borderRadius: 4,
  alignSelf: 'stretch',
  width: '100%',
  height: '100%',
}

/**
 * A user avatar image with linear gradient overlay.
 */
export function Avatar(props: AvatarProps) {
  // grab the props
  const {
    activeOpacity = 1, // 0.7,
    guild,
    preset = 's138x200',
    style: styleOverride,
    forOnPress,
    uri,
    ...rest
  } = props // uri

  const wrapperStyle = {
    ...avatarContainerPreset[preset],
    ...styleOverride,
  }

  const defaultAvatar = guild ? images.guildsBig : require('./avatar.png') // images.guild
  const source = uri ? { uri } : defaultAvatar

  return (
    <TouchableOpacity onPress={forOnPress} activeOpacity={activeOpacity}>
      <View style={wrapperStyle}>
        <Image source={source} {...rest} style={AVATAR} />
      </View>
    </TouchableOpacity>
  )
}
