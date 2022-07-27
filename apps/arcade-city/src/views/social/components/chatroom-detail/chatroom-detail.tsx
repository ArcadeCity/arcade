import { capitalize } from 'lib/util'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { isEmpty } from 'ramda'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'stores'
import { Chatroom } from 'stores/chat-store'
import { Avatar, Icon, Text, TextHighlight } from 'views/shared'
import { useNavigation } from '@react-navigation/native'

interface Props {
  chatroom: Chatroom
  setActiveChatroom?: any
}

export const ChatroomDetail = observer(
  ({ chatroom, setActiveChatroom }: Props) => {
    const { authStore, playerStore } = useStores()
    const { navigate } = useNavigation<any>()
    const { messages } = chatroom

    if (messages.length === 0 && chatroom.type === 'direct') return null

    const lastMessage: any = messages[messages.length - 1]

    const formattedType = capitalize(chatroom.type)

    const formatName = (name: string) => {
      if (chatroom.type === 'direct') {
        const exploded: string[] = chatroom.prettyName.split(' / ')
        const thename =
          exploded[0] === authStore.username ? exploded[1] : exploded[0]
        return thename
      }
      return name
    }
    const formattedName = formatName(chatroom.prettyName)

    const getChatroomPic = () => {
      const otherUserId =
        chatroom.user1id === authStore.id ? chatroom.user2id : chatroom.user1id
      if (!otherUserId)
        return { picture: '', otherUserId: otherUserId?.toString() } // does this screw up group chats
      return {
        picture: playerStore.players?.get(otherUserId.toString())
          ?.profilePicture,
        otherUserId: otherUserId.toString(),
        username: playerStore.players?.get(otherUserId.toString())?.username,
      }
    }
    const { picture, otherUserId, username }: any = getChatroomPic()

    return (
      <TouchableOpacity
        key={`${chatroom.id}-${authStore?.locale}`}
        onPress={async () => {
          await setActiveChatroom(chatroom.id)
          navigate('inbox', {
            screen: 'chatroom',
            params: { title: formattedName },
          })
        }}
        style={{ marginBottom: 25 }}
      >
        <View style={{ flexDirection: 'row' }}>
          {chatroom.type === 'direct' ? (
            <Avatar
              preset='s32x32'
              uri={picture}
              style={{ marginTop: 5 }}
              forOnPress={async () => {
                await setActiveChatroom(chatroom.id)
                navigate('inbox', {
                  screen: 'chatroom',
                  params: { title: formattedName },
                })
                // playerStore.setSelectedPlayer(otherUserId)
                // navigate('inbox', {
                //   screen: 'profile',
                //   params: { username },
                // })
              }}
            />
          ) : (
            <View style={{ marginTop: 10 }}>
              <Icon name='map' />
            </View>
          )}

          <View style={{ paddingLeft: 20, flexDirection: 'column' }}>
            <Text preset='bold' text={formattedName} />
            <View style={{ width: 275 }}>
              {
                lastMessage ? (
                  <Text
                    preset='description'
                    text={lastMessage.text}
                    style={{ marginBottom: 0 }}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  />
                ) : null
                // <Text
                //     preset="description"
                //     text="No messages yet - come say hello!"
                //     style={{ marginBottom: 0 }}
                //     numberOfLines={1}
                //     ellipsizeMode="tail"
                // />
              }
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextHighlight
                preset='small'
                text={formattedType}
                viewStyle={{
                  width: 80,
                  alignSelf: 'flex-start',
                  marginTop: 8,
                }}
              />
              {lastMessage && (
                <Text
                  preset='description'
                  text={
                    isEmpty(lastMessage)
                      ? ''
                      : moment.utc(lastMessage?.createdAt).fromNow()
                  }
                  style={{ marginVertical: 12, marginLeft: 15 }}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)
