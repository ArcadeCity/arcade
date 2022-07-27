import { translate, TxKeyPath } from 'i18n'
import { flatten } from 'ramda'
import React from 'react'
import {
  StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle
} from 'react-native'
import { color, palette, spacing, typography } from 'views/theme'
import { Text } from '../text/text'

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * Container style?
   */
  containerStyle?: ViewStyle

  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props

  const containerStyles = flatten([CONTAINER, PRESETS[preset], styleOverride])
  const inputStyles = flatten([INPUT, inputStyleOverride])
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyles}>
      <Text preset='label' tx={labelTx} text={label} />
      <View style={FIELD}>
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.blueBell}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyles}
          ref={forwardedRef}
        />
      </View>
    </View>
  )
}

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingTop: 0, //spacing[0],
  paddingBottom: spacing[4],
}

const FIELD: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: color.field,
  borderRadius: 8,
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  borderRadius: 8,
  flex: 1,
  fontFamily: typography.primary,
  color: color.secondary,
  fontSize: 20,
  // lineHeight: 30,
  height: 50,
  backgroundColor: color.field,
  paddingLeft: spacing[4],
  // paddingVertical: spacing[3],
}
