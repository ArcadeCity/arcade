import React from 'react'
import { View } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { Instance } from 'mobx-state-tree'
import { MessageModel } from 'stores/chat-store'
import { Avatar, Text } from 'views/shared'
import { messagePresets, MessagePresetNames } from './message.presets'
import { useStores } from 'stores'

interface Props {
  message: Instance<typeof MessageModel>
  preset: MessagePresetNames
  setSelectedPlayer?: any
}

export const Message: React.FC<Props> = ({ message, preset }) => {
  // const { navigate, setParams } = useNavigation<any>()

  const { authStore } = useStores()

  const text = message.text
  const username = message.player?.username
  const date = message.createdAt
  const photo = message.player?.profilePicture ?? undefined

  const delivered = true
  const messagePreset: any = messagePresets[preset]
  const deliveryTime = moment(date).fromNow()

  return (
    <View key={`${deliveryTime}-${authStore?.locale}`}>
      <View style={messagePreset.container}>
        <View style={messagePreset.textBubble}>
          <Text style={messagePreset.textContent} text={text} />
        </View>
        {delivered && (
          <View style={{ flexDirection: 'column-reverse' }}>
            <Avatar
              preset='s32x32'
              uri={photo}
              style={{ flexDirection: 'row-reverse' }}
              // forOnPress={() => {
              //   setParams({ username })
              //   navigate('inbox', {
              //     screen: 'profile',
              //     params: { username },
              //   })
              // }}
            />
          </View>
        )}
      </View>
      <View>
        {delivered ? (
          <View style={messagePreset.date}>
            <Text style={messagePreset.dateText}>
              {username} - {deliveryTime}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}
