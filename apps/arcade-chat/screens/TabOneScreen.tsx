import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { RootTabScreenProps } from '../types'
import { ChannelList } from '../components/ChannelList'
import { ACTIVE_OPACITY, palette } from '@arcadecity/ui'
import { AntDesign } from '@expo/vector-icons'
import { useCallback } from 'react'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const clickNewChannel = useCallback(() => {
    console.log('click new channel')
  }, [])
  return (
    <View style={styles.container}>
      <ChannelList />
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={styles.floatingButton}
        onPress={clickNewChannel}
      >
        <AntDesign name='plus' size={26} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.electricIndigo,
    position: 'absolute',
    bottom: 25,
    right: 15,
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
