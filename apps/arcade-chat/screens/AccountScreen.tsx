import { color, Text } from '@arcadecity/ui'
import { useAccountMetadata } from '@arcadecity/use-arcade'
import { StyleSheet, View } from 'react-native'

export default function AccountScreen() {
  const accountMetadata = useAccountMetadata()
  console.log(accountMetadata)
  return (
    <View style={styles.container}>
      <Text text='Account' preset='title' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.background,
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
