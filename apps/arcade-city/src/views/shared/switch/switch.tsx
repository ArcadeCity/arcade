import { log } from 'lib'
import * as React from 'react'
import {
  ViewStyle,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'
import { color } from 'views/theme'
import { SwitchProps } from './switch.props'

// dimensions
const THUMB_SIZE = 20
const WIDTH = 40
const MARGIN = 0
const OFF_POSITION = -0.5
const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4

// colors
const ON_COLOR = color.primary
const OFF_COLOR = color.field
const BORDER_ON_COLOR = ON_COLOR
const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.1)'

// animation
const DURATION = 250

// the track always has these props
const TRACK = {
  height: THUMB_SIZE + MARGIN,
  width: WIDTH,
  borderRadius: BORDER_RADIUS,
  borderWidth: MARGIN / 2,
  backgroundColor: color.background,
}

// the thumb always has these props
const THUMB: ViewStyle = {
  position: 'absolute',
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderColor: BORDER_OFF_COLOR,
  borderRadius: THUMB_SIZE / 2,
  borderWidth: MARGIN / 2,
  backgroundColor: color.palette.white,
  shadowColor: BORDER_OFF_COLOR,
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 2,
}

interface SwitchState {
  timer: Animated.Value
}

export class Switch extends React.PureComponent<SwitchProps, SwitchState> {
  state = {
    timer: new Animated.Value(this.props.value ? 1 : 0),
  }

  startAnimation(newValue: boolean) {
    const toValue = newValue ? 1 : 0
    const easing = Easing.out(Easing.circle)
    Animated.timing(this.state.timer, {
      toValue,
      duration: DURATION,
      easing,
      useNativeDriver: true,
    }).start()
  }

  UNSAFE_componentWillReceiveProps(newProps: SwitchProps) {
    if (newProps.value && newProps.value !== this.props.value) {
      log('componentWillReceiveProps about to animate')
      this.startAnimation(newProps.value)
    }
  }

  /**
   * Fires when we tap the touchable.
   */
  handlePress = () =>
    this.props.onToggle && this.props.onToggle(!this.props.value)

  /**
   * Render the component.
   */
  render() {
    const translateX = this.state.timer.interpolate({
      inputRange: [0, 1],
      outputRange: [OFF_POSITION, ON_POSITION],
    })

    const trackStyle = {
      ...TRACK,
      ...{
        backgroundColor: this.props.value ? ON_COLOR : OFF_COLOR,
        borderColor: this.props.value ? BORDER_ON_COLOR : BORDER_OFF_COLOR,
      },
      ...(this.props.value
        ? this.props.trackOnStyle
        : this.props.trackOffStyle),
    }

    const thumbStyle = {
      ...THUMB,
      ...{ transform: [{ translateX }] },
      ...(this.props.value
        ? this.props.thumbOnStyle
        : this.props.thumbOffStyle),
    }

    return (
      <TouchableWithoutFeedback
        onPress={this.handlePress}
        style={this.props.style}
      >
        <Animated.View style={trackStyle}>
          <Animated.View style={thumbStyle} />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
