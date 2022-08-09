import { View, Text } from 'dripsy'
import { TextLink } from 'solito/link'

export function UserDetailScreen() {
  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}>{`Hello!`}</Text>
      <TextLink href='/'>👈 Go Home</TextLink>
      <TextLink href='/components'>👈 Components</TextLink>
    </View>
  )
}
