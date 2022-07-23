/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'
import { color } from '@arcadecity/ui'

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const textColor = color.text
  return <DefaultText style={[{ color: textColor }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = color.background
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
