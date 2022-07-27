/**
 *  Text with a stylized View container.
 */

import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../text'
import { viewPresets, textPresets } from './text-highlight.presets'

interface Props {
  viewStyle?: any
  textStyle?: any
  text: string
  preset: string
}

export const TextHighlight = (props: Props) => {
  const {
    text,
    textStyle: textStyleOverride = {},
    viewStyle: viewStyleOverride = {},
    preset = 'small',
  } = props

  const textPresetToUse = textPresets[preset] || textPresets.small
  const viewPresetToUse = viewPresets[preset] || viewPresets.small

  const textStyle = { ...textPresetToUse, ...textStyleOverride }
  const viewStyle = { ...viewPresetToUse, ...viewStyleOverride }

  return (
    <View style={viewStyle}>
      <Text text={text} style={textStyle} />
    </View>
  )
}
