import { Button, StyleSheet } from 'react-native'
import { useChannelsCreated } from '@arcadecity/use-arcade'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { ChannelList } from '../components/ChannelList'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  // const channels = useChannelsCreated()
  // useArcadeRelay()
  // const createChannel = () => {
  //   console.log('create channel')
  // }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{channels.length} channels</Text> */}
      <ChannelList />
      {/* <Button onPress={createChannel} title='Create Channel' /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
