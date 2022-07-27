import { observer } from 'mobx-react-lite'
import { useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStores } from 'stores'
import { Screen, Text } from 'views/shared'
import { palette, spacing } from 'views/theme'
import {
    BackdropBlur, BlurMask, Canvas, Fill, Group, rect, RoundedRect, rrect
} from '@shopify/react-native-skia'
import { Button } from '../Button'

interface Props {
  children: any
  title?: string
  titleTx?: string
}

export const Panel = observer(({ children, title, titleTx }: Props) => {
  const { authStore, hudStore } = useStores()
  const insets = useSafeAreaInsets()
  const window = useWindowDimensions()
  const rectWidth = window.width - insets.right - insets.left - 20
  const rectHeight = window.height - insets.bottom - insets.top - 10
  const rectTop = insets.top + 10

  const dst = rect(
    insets.left + insets.right + 10,
    rectTop,
    rectWidth,
    rectHeight
  )
  const clip = rrect(dst, 30, 30)

  return (
    <>
      <Canvas style={{ flex: 1, zIndex: 9898 }} pointerEvents='none'>
        <Group>
          <BackdropBlur blur={40 / 3} clip={clip}>
            <Fill color={palette.haiti} />
            <Group>
              <RoundedRect
                rect={clip}
                style='stroke'
                strokeWidth={2}
                color={palette.minsk}
              >
                <BlurMask blur={6} style={'solid'} />
              </RoundedRect>
            </Group>
          </BackdropBlur>
        </Group>
      </Canvas>
      <View
        pointerEvents='auto'
        style={{
          flex: 1,
          position: 'absolute',
          top: rectTop,
          left: (window.width - rectWidth) / 2,
          right: (window.width - rectWidth) / 2,
          bottom: insets.bottom,
          borderRadius: 30,
          zIndex: 9898,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          margin: 4,
        }}
      >
        <Button
          onPress={() => hudStore.closePanel()}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: -26,
            right: -26,
            zIndex: 9999,
          }}
          hud
          withIcon='x'
          panelClose
        />
        <Screen
          preset='scrollStack'
          key={authStore?.locale}
          transparent
          rounded
          style={{ paddingHorizontal: spacing[4] }}
        >
          {(title || titleTx) && (
            <Text
              text={title}
              tx={titleTx}
              preset='title3'
              style={{
                textAlign: 'center',
                marginTop: 30,
                marginBottom: 15,
                fontSize: 28,
                lineHeight: 32,
                //   fontFamily: typography.primary,
                // color: palette.blueBright,
                color: palette.moonRaker,
              }}
            />
          )}
          {children}
        </Screen>
      </View>
    </>
  )
})
