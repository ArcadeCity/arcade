import { color } from '@arcadecity/ui'
import { StyleSheet, View } from 'react-native'

export const MessageList = () => {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.palette.purple,
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
})
