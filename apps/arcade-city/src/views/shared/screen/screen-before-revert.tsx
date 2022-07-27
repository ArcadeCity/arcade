import { goBack, RootNavigation } from 'navigation/navigation-utilities'
import { has } from 'ramda'
import * as React from 'react'
import {
    Dimensions, KeyboardAvoidingView, Platform, Pressable, SafeAreaView,
    ScrollView, TouchableOpacity, View, ViewStyle
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { color, palette, spacing } from 'views/theme'
import { Ionicons } from '@expo/vector-icons'
import { isNonScrolling, offsets, presets } from './screen.presets'
import { ScreenProps } from './screen.props'

// These magic numbers are harvested from react-navigation.
//
// They have Header.HEIGHT, but have deprecated it because they don't
// have a good way to dynamically acquire the height.
//
// For our app, we are locked to portrait and support SafeView already, so
// it's "safe" to use these.
//
// Watch for the exciting conclusion:
//
//   https://github.com/react-navigation/react-navigation/issues/2411
//
const statusBarHeight = () => {
  const { height, width } = Dimensions.get('window')
  return !(Platform.OS === 'ios')
    ? 0
    : height === 812 || width === 812
    ? 44
    : 20
}
const isIos = Platform.OS === 'ios'
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUSBAR_HEIGHT = statusBarHeight()
const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT

// jeez... when I switched the softInputMode on android, a magical 20 pixel padding was required
// on the offset... yikes.  a quick exploration into react-navigation source code turned up nothing.
const UNEXPLICABLE_PAN_ADJUSTMENT_ON_ANDROID =
  Platform.OS === 'android' ? 20 : 0

const ChatroomScreen = (props: any) => {
  const preset: any = presets[props.preset] || presets.fixed
  const style = { ...preset.nonScroll, ...props.style }

  // outside the app doesn't use a header
  let dockHeight: any =
    (props.preset as any) === 'outsideApp' ? 0 : HEADER_HEIGHT

  // always allow individual screens to override
  if (has('dockHeight', props)) {
    dockHeight = props.dockHeight
  }

  // classic programmers
  dockHeight = dockHeight + UNEXPLICABLE_PAN_ADJUSTMENT_ON_ANDROID

  // no dock, no height, no exceptions
  if (!props.dock) {
    dockHeight = 0
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: color.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={style}>
        <SafeAreaView style={{ ...style, paddingHorizontal: spacing[4] }}>
          {props.children}
        </SafeAreaView>
        <SafeAreaView>{props.dock}</SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * This screen does not scroll.
 *
 * @param props The screen props
 */
// function ScreenWithoutScrolling(props: ScreenProps) {
//   const insets = useSafeAreaInsets()
//   const preset = props.preset ?? presets.fixed
//   const style = props.style || {}
//   const backgroundStyle = props.backgroundColor
//     ? { backgroundColor: props.backgroundColor }
//     : {}
//   const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

//   return (
//     <KeyboardAvoidingView
//       style={{ backgroundColor: color.background, flex: 1, height: '100%' }}
//       behavior={isIos ? 'padding' : undefined}
//       keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
//     >
//       {props.withBackButton && <BackButton />}
//       {/* <StatusBar barStyle={props.statusBar || "light-content"} /> */}
//       <View style={[style, insetStyle]}>{props.children}</View>
//     </KeyboardAvoidingView>
//   )
// }
function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets[props.preset] || presets.fixed
  const style = { ...preset.nonScroll, ...props.style }

  return (
    <View style={style}>
      {props.withBackButton && <BackButton />}
      {props.unsafe ? (
        props.children
      ) : (
        <SafeAreaView style={{ ...style, paddingHorizontal: 0 }}>
          {props.children}
        </SafeAreaView>
      )}
    </View>
  )
}

/**
 * This screen scrolls.
 *
 * @param props The screen props
 */
// class ScreenWithScrolling extends React.Component<ScreenProps, ScreenState> {
//   // scrollToBottom(params = { animated: true }) {
//   //   // TODO: move this to a better event once main message view is converted to flatlist
//   //   this.refs.screenScroll.scrollToEnd(params)
//   // }

//   render() {
//     const preset = presets[this.props.preset] || presets.scroll
//     const outerStyle = preset.scrollOuter
//     const innerStyle = {
//       ...preset.scrollInner,
//       ...this.props.style,
//     } as ViewStyle

//     // outside the app doesn't use a header
//     let dockHeight: number =
//       (this.props.preset as any) === 'outsideApp' ? 0 : HEADER_HEIGHT

//     // always allow individual screens to override
//     if (has('dockHeight', this.props)) {
//       dockHeight = this.props.dockHeight || 0
//     }

//     // classic programmers
//     dockHeight = dockHeight + UNEXPLICABLE_PAN_ADJUSTMENT_ON_ANDROID

//     // no dock, no height, no exceptions
//     if (!this.props.dock) {
//       dockHeight = 0
//     }

//     return (
//       <KeyboardAvoidingView
//         style={{
//           flex: 1,
//           backgroundColor: this.props.transparent
//             ? 'transparent'
//             : color.background, // ,
//         }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={80}
//       >
//         <ScrollView
//           // tslint:disable-next-line: jsx-no-string-ref
//           // ref="screenScroll"
//           nestedScrollEnabled
//           pointerEvents='box-none'
//           // ref={(ref) => (global.screen = ref)}
//           style={{
//             ...outerStyle,
//             backgroundColor: this.props.transparent
//               ? 'transparent'
//               : color.background,
//           }}
//           contentContainerStyle={innerStyle}
//           keyboardShouldPersistTaps='always'
//         >
//           {this.props.withBackButton && <BackButton />}

//           <SafeAreaView>{this.props.children}</SafeAreaView>
//         </ScrollView>
//         <SafeAreaView>{this.props.dock}</SafeAreaView>
//       </KeyboardAvoidingView>
//     )
//   }
// }

// interface ScreenState {}

// /**
//  * The starting component on every screen in the app.
//  *
//  * @param props The screen props
//  */
// // tslint:disable-next-line: max-classes-per-file
// export class Screen extends React.Component<ScreenProps, ScreenState> {
//   // export function Screen(props: ScreenProps) {
//   render() {
//     if (this.props.preset === 'chatroom') {
//       return <ChatroomScreen {...this.props} />
//     }

//     if (isNonScrolling(this.props.preset)) {
//       return <ScreenWithoutScrolling {...this.props} />
//     }
//     // tslint:disable-next-line: jsx-no-string-ref
//     return <ScreenWithScrolling {...this.props} ref='sws' />
//   }
// }

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {
        backgroundColor: props.rounded ? color.transparent : color.background,
        borderRadius: props.rounded ? 30 : 0,
      }
  // const insetStyle = {}
  // const insetStyle = { paddingHorizontal: spacing[4] }
  const insetStyle = { paddingTop: props.safe ? insets.top : 0 }
  // const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  // The followings for <Screen preset='auto'/>
  // This will automatically disables scrolling if content fits the screen.
  const { height } = Dimensions.get('window')
  const scrollViewHeight = React.useRef<any>(null)
  const [scrollEnabled, setScrollEnabled] = React.useState(true)

  const updateScrollState = () => {
    if (props.preset === 'auto') {
      // check whether if content fits the screen
      // then toggle scroll state according to it
      const contentFitsScreen =
        scrollViewHeight.current <
        height * presets.auto.offset.percent - presets.auto.offset.point

      // content is less than the size of the screen, so we can disable scrolling
      if (scrollEnabled && contentFitsScreen) setScrollEnabled(false)

      // content is greater than the size of the screen, so let's enable scrolling
      if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true)
    } else if (!scrollEnabled) {
      // set back initial value in case it's stucked in a disabled state
      // i.e. if we've just changed preset from 'auto' to 'scroll'
      setScrollEnabled(true)
    }
  }

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // update scroll view height
    scrollViewHeight.current = contentHeight

    // then update scroll state
    updateScrollState()
  }

  // update scroll state on every render
  // when scrollViewHeight isn't null
  if (scrollViewHeight.current !== null) updateScrollState()

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      {/* <StatusBar barStyle={props.statusBar || "light-content"} /> */}
      {props.withBackButton && <BackButton />}
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || 'handled'
          }
          onContentSizeChange={
            props.preset === 'auto' ? onContentSizeChange : undefined
          }
          scrollEnabled={scrollEnabled}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (props.preset === 'chatroom') {
    return <ChatroomScreen {...props} />
  }
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}

export const BackButton = () => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 48,
        left: 8,
        height: 42,
        width: 48,
        zIndex: 7000,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => goBack()}
      activeOpacity={0.8}
    >
      <Ionicons
        name='arrow-back-circle-outline'
        size={38}
        color={palette.blueBell}
        // color={palette.arwesFade}
      />
    </TouchableOpacity>
  )
}
