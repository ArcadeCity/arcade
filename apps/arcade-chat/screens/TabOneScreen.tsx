import { StyleSheet } from 'react-native'
import { View } from '../components/Themed'
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
