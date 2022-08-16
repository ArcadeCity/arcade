import { TouchableOpacity, View } from 'react-native'
import { BackgroundGradient } from './BackgroundGradient'

const DEFAULT_ACTIVE_OPACITY: number = 0.8
const HEIGHT = 48
const WIDTH = HEIGHT

const RADIUS = 10

export const Button = (props) => {
  const {
    panelClose = false,
    subtle = false,
    children,
    width = WIDTH,
    height = HEIGHT,
    ...rest
  } = props
  const CARD_HEIGHT = height - 5
  const CARD_WIDTH = width - 5
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      {...rest}
      activeOpacity={DEFAULT_ACTIVE_OPACITY}>
      <BackgroundGradient
        width={width}
        height={height}
        radius={RADIUS}
        // subtle={panelClose || subtle}
      />

      <View
        style={[
          {
            height: CARD_HEIGHT,
            width: CARD_WIDTH,
            backgroundColor: panelClose || subtle ? 'transparent' : 'rgba(0,0,0,0.85)', // palette.haiti,
            position: 'absolute',
            borderRadius: RADIUS,
            zIndex: 300,
            justifyContent: 'center',
            alignItems: 'center',
          },
          panelClose ? { top: 26, right: 26 } : {},
        ]}>
        {children}
        {/* <Icon
          name={withIcon ?? 'menu'}
          color={subtle || panelClose ? palette.blueBell : palette.blueBell}
          size={28}
        /> */}
      </View>
    </TouchableOpacity>
  )
}
