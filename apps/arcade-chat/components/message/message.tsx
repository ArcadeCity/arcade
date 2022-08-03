import React from 'react'
import { Image, View } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { Text } from '@arcadecity/ui'
// import { Avatar, Text } from 'views/shared'
import { messagePresets, MessagePresetNames } from './message.presets'
import { Message as MessageType } from '@arcadecity/use-arcade'

interface Props {
  message: MessageType
  preset: MessagePresetNames
  setSelectedPlayer?: any
}

export const MessagePreview: React.FC<Props> = ({ message, preset }) => {
  const text = message.text
  const username = `Anon-${message.pubkey.trim().substr(0, 5)}`
  const date = message.created_at * 1000
  const twohundy = Math.round(200 + Math.random() * 5)
  const photo = `https://placekitten.com/200/${twohundy.toString()}`

  const delivered = true
  const messagePreset: any = messagePresets[preset]
  const deliveryTime = moment(date).fromNow()

  return (
    <View key={`${deliveryTime}`}>
      <View style={messagePreset.container}>
        <View style={messagePreset.textBubble}>
          <Text style={messagePreset.textContent} text={text} />
        </View>
        {delivered && (
          <View style={{ flexDirection: 'column-reverse' }}>
            <Image source={{ uri: photo }} style={{ width: 40, height: 40, borderRadius: 8 }} />
            {/* <Avatar
              preset='s32x32'
              uri={photo}
              style={{ flexDirection: 'row-reverse' }}
              forOnPress={() => {
                setParams({ username })
                navigate('inbox', {
                  screen: 'profile',
                  params: { username },
                })
              }}
            /> */}
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
