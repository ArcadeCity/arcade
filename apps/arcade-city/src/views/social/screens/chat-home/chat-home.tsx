// import { usePlayerResolver } from 'lib/hooks'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { FlatList, useWindowDimensions, View, ViewStyle } from 'react-native'
// import { usePlayerResolver } from 'lib/hooks'
import { useStores } from 'stores'
import { Chatroom } from 'stores/chat-store'
import { Loading } from 'views/loading'
// import { Loading } from 'views/loading'
import { Screen } from 'views/shared'
import { spacing } from 'views/theme'
import { useNavigation } from '@react-navigation/native'
// import { FlashList } from '@shopify/flash-list'
import { ChatroomDetail } from '../../components'

export const ChatHome: React.FC<{}> = observer(() => {
  const { height } = useWindowDimensions()

  // Nav
  const { setOptions } = useNavigation<any>()
  useEffect(() => {
    setOptions({ title: 'Chat' })
  }, [])

  // State
  const { chatStore } = useStores()
  const chatrooms = chatStore.chatrooms
  if (!chatrooms) return <></>

  const loadedAllPlayers = false
  // const { loadedAllPlayers } = usePlayerResolver({ chatrooms })
  if (!loadedAllPlayers) return <Loading message='Loading' />

  const chatroomsArray: any[] = []
  chatrooms.forEach((chatroom: Chatroom) => {
    if (chatroom.messages.length === 0 && chatroom.type === 'direct') return
    if (chatroom.type === 'request') return // TODO
    const lastMessage: any = chatroom.messages[chatroom.messages.length - 1] ?? null
    chatroomsArray.push({
      ...chatroom,
      lastMessage,
    })
  })

  // TODO: should be a chatStore view
  const sortedChatrooms = chatroomsArray.sort((a: any, b: any) => {
    if (a.lastMessage && b.lastMessage) {
      return b.lastMessage.createdAt - a.lastMessage.createdAt
    } else if (a.lastMessage && !b.lastMessage) {
      return -1
    } else if (b.lastMessage && !a.lastMessage) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <Screen preset='scrollStack'>
      <View style={{ ...CONTAINER, minHeight: height }}>
        <FlatList
          data={sortedChatrooms}
          renderItem={({ item }: any) => (
            <ChatroomDetail chatroom={item} setActiveChatroom={chatStore.setActiveChatroom} />
          )}
          // estimatedItemSize={25}
        />
      </View>
    </Screen>
  )
})

const CONTAINER: ViewStyle = {
  paddingBottom: spacing[7],
  paddingHorizontal: spacing[3],
  marginTop: spacing[5],
}
