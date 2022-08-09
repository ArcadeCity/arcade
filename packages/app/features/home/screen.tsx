import { useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { color } from '@arcadecity/ui'
import { useArcadeRelay } from '@arcadecity/use-arcade/src/index'
import Ionicons from '@expo/vector-icons/Ionicons'

export function HomeScreen() {
  const sx = useSx()

  useArcadeRelay()

  return (
    <View
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        p: 16,
        backgroundColor: color.background,
      }}>
      <H1 sx={{ color: color.text, fontWeight: '800' }}>Arcade Chat</H1>
      <View sx={{ maxWidth: 600 }}>
        <P sx={{ textAlign: 'center' }}>
          follow us on {''}
          <A
            href='https://twitter.com/ArcadeCityHall'
            // @ts-expect-error react-native-web only types
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
            sx={{ color: 'blue' }}>
            twitter
          </A>
          .
        </P>
        <P sx={{ textAlign: 'center' }}>
          Cross Platform Expo Vector Icon{' '}
          <Ionicons name='md-checkmark-circle' size={32} color='green' />
        </P>
      </View>
      <View sx={{ height: 32 }} />
      <Row>
        <TextLink
          href='/user/satoshi'
          textProps={{
            style: sx({ fontSize: 16, fontWeight: 'bold', color: 'blue' }),
          }}>
          Regular Link
        </TextLink>
      </Row>
    </View>
  )
}
