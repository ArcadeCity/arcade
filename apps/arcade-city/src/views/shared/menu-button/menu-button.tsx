import * as React from 'react'
import {
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Text } from '../text'
// import { Avatar } from '../avatar'
import { MenuButtonProps } from './menu-button.props'
import { color, spacing, images } from '../../theme'

const ROOT: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: color.line,
  maxHeight: 100,
  paddingVertical: spacing[6],
}

const CONDENSED: ViewStyle = {
  paddingVertical: spacing[5],
}

const IMAGE: ViewStyle = {
  paddingVertical: spacing[2],
  marginLeft: spacing[3],
  marginRight: spacing[4],
  width: 40,
  height: 40,
}

const DESCRIPTION: TextStyle = {
  marginBottom: 0,
  marginTop: spacing[1],
}

const NEXT: ImageStyle = {
  marginLeft: 'auto',
}

/**
 * It's the menu button. For keeping all those options in order.
 */
export function MenuButton(props: MenuButtonProps) {
  // grab the props
  const {
    preset = 'default',
    titleTx,
    title,
    descriptionTx,
    description,
    image,
    children,
    last,
    style: styleOverride,
    ...rest
  } = props

  // do we have a title
  const hasTitle = titleTx || title

  // do we have a description
  const hasDescription = descriptionTx || description

  // assemble the base TouchableOpacity style
  const setViewStyle = {
    ...ROOT,
    ...(preset === 'condensed' ? CONDENSED : {}),
    ...(last ? { borderBottomWidth: 0 } : {}),
    ...styleOverride,
  }

  const setImageStyle = {
    ...IMAGE,
    ...(preset === 'condensed' ? { marginRight: spacing[4] } : {}),
  }

  return (
    <TouchableOpacity {...(rest as any)} style={setViewStyle}>
      <View style={(image || children) && setImageStyle}>
        {image && (
          <Image
            source={image}
            style={{ height: 24, width: 24, resizeMode: 'contain' }}
          />
        )}
        {children}
      </View>
      <View style={{ minHeight: 20 }}>
        {hasTitle && <Text preset='label' tx={titleTx} text={title} />}
        {hasDescription && (
          <Text
            preset='description'
            tx={descriptionTx}
            text={description}
            style={DESCRIPTION}
          />
        )}
      </View>
      <Image source={images.next} style={NEXT} />
    </TouchableOpacity>
  )
}
