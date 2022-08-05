import { StyleSheet, View } from 'react-native'
import { RootTabScreenProps } from '../types'
import { ChannelList } from '../components/ChannelList'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <ChannelList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
