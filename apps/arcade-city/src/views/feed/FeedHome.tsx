import { RideRequest as RideRequestType } from 'lib/nostr'
import { useStore } from 'lib/nostr/store'
import { RootTabScreenProps } from 'navigation/types'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RideRequest } from 'views/ride/RideRequest'
import { ACTIVE_OPACITY, palette } from '@arcadecity/ui'
import { AntDesign } from '@expo/vector-icons'

export const FeedHome = ({ navigation }: RootTabScreenProps<'FeedHome'>) => {
  const events = useStore((s) => s.requests)
  const sortedEvents = events.sort((a: RideRequestType, b: RideRequestType) => {
    return b.created_at - a.created_at
  })
  // .slice(20)
  const key = 'id'
  const arrayUniqueByKey = [...new Map(sortedEvents.map((item) => [item[key], item])).values()]
  const clickNewRequest = () => {
    navigation.navigate('NewRequest')
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={arrayUniqueByKey}
        // renderItem={({ item }: { item: NostrEvent }) => (
        //   <Text text={item.content} preset='description' />
        // )}
        renderItem={({ item }: { item: RideRequestType }) => <RideRequest request={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      />
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={styles.floatingButton}
        onPress={clickNewRequest}
      >
        <AntDesign name='plus' size={26} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.electricViolet,
    position: 'absolute',
    bottom: 25,
    right: 15,
  },
})
