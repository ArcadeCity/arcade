import { flatten } from 'ramda'
import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { palette } from 'views/theme'
import { Feather as Icon, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text } from '../Text/Text'
import { disabledViewPresets, textPresets, viewPresets } from './Button.presets'
import { ButtonProps } from './Button.props'
import { BackgroundGradient } from 'views/skia/components/BackgroundGradient'

const DEFAULT_ACTIVE_OPACITY: number = 0.8
const HEIGHT = 48
const WIDTH = HEIGHT

const CARD_HEIGHT = HEIGHT - 5
const CARD_WIDTH = WIDTH - 5
const RADIUS = 10

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  const {
    checked,
    children,
    hud,
    panelClose,
    preset = 'primary',
    style: styleOverride,
    subtle,
    text,
    textStyle: textStyleOverride,
    tx,
    withIcon,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const disabledViewStyle =
    props.disabled &&
    (disabledViewPresets[preset] || disabledViewPresets.primary)
  const iconStyle = props.icon && (viewPresets['icon'] || viewPresets.icon)
  const viewStyles = flatten([
    viewStyle,
    disabledViewStyle,
    iconStyle,
    styleOverride,
  ])

  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = flatten([textStyle, textStyleOverride])

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  if (hud) {
    return (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        {...props}
        activeOpacity={DEFAULT_ACTIVE_OPACITY}
      >
        <BackgroundGradient
          width={WIDTH}
          height={HEIGHT}
          radius={RADIUS}
          subtle={panelClose || subtle}
        />

        <View
          style={[
            {
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
              backgroundColor:
                panelClose || subtle ? 'transparent' : 'rgba(0,0,0,0.85)', // palette.haiti,
              position: 'absolute',
              borderRadius: RADIUS,
              zIndex: 300,
              justifyContent: 'center',
              alignItems: 'center',
            },
            panelClose ? { top: 26, right: 26 } : {},
          ]}
        >
          <Icon
            name={withIcon ?? 'menu'}
            color={subtle || panelClose ? palette.blueBell : palette.blueBell}
            size={28}
          />
        </View>
      </TouchableOpacity>
    )
  }

  if (withIcon) {
    return (
      <TouchableOpacity
        activeOpacity={DEFAULT_ACTIVE_OPACITY}
        style={viewStyles}
        {...rest}
      >
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name={withIcon}
            style={{
              ...textStyles,
              marginRight: 0,
              paddingRight: 8,
              fontSize: 18,
              marginTop: 2,
              color: palette.white,
            }}
          />
          <Text
            preset='label'
            tx={tx}
            text={text}
            style={{
              ...textStyles,
              marginLeft: 0,
              paddingLeft: 10,
              fontSize: 18,
              lineHeight: 24,
              letterSpacing: 1,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
      style={viewStyles}
      {...rest}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 10,
          bottom: 0,
          // backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          width: 30,
        }}
      >
        {checked === false && (
          <MaterialCommunityIcons
            name='checkbox-blank-outline'
            size={24}
            color={palette.arwes}
          />
        )}
        {checked === true && (
          <MaterialCommunityIcons
            name='checkbox-marked-outline'
            size={26}
            color={palette.arwes}
          />
        )}
      </View>
      {content}
    </TouchableOpacity>
  )
}
