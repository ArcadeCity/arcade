import { translate } from 'i18n'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, useWindowDimensions, View } from 'react-native'
import { useStores } from 'stores'
import { Button, Screen, Text, TextField } from 'views/shared'
import { palette, spacing } from 'views/theme'
import { useNavigation } from '@react-navigation/native'
import { Message } from '../../components'
import * as styles from './styles'

let messages: any[] = []

export const Chatroom: React.FC<{}> = observer(() => {
  // State
  const { authStore, chatStore, playerStore } = useStores()
  const activeChatroom = chatStore.activeChatroom

  // Form
  const { register, setValue } = useForm()
  const [state, update] = useState('')

  let prettyName = ''

  // Nav
  const { setOptions } = useNavigation<any>()
  useEffect(() => {
    const exploded: string[] = prettyName.split(' / ')
    const thename =
      exploded[0] === authStore.username ? exploded[1] : exploded[0]
    setOptions({ title: `Chat - ${thename}` })
  }, [prettyName])

  const window = useWindowDimensions()

  // UI
  let flatList: any
  console.log('Messages changed', messages.length)
  useEffect(() => {
    // Any time messages changes, scroll to end.
    flatList && flatList.scrollToEnd()
  }, [messages])

  useEffect(() => {
    register('message')
  }, [register])

  if (!activeChatroom) {
    return (
      <Screen
        preset='fixedCenter'
        transparent
        style={{ backgroundColor: palette.haiti, width: window.width }}
        withBackButton
      >
        <Text preset='title2' tx='common.loading' />
      </Screen>
    )
  }

  const chatroomId = activeChatroom.id
  messages = activeChatroom.messages
  prettyName = activeChatroom.prettyName
  const id = authStore.player?.id || 0
  if (id === 0) {
    console.log('no id what')
    return null
  }

  const sendit = () => {
    chatStore.messageSend(state, chatroomId)
    update('')
    setValue('message', '')
  }

  const dock = (
    <View style={styles.DOCK}>
      <TextField
        placeholder={translate('service.enterMessage')}
        onChangeText={(text) => {
          update(text)
          setValue('message', text)
        }}
        value={state}
        autoCorrect={false}
        // inputStyle={{ lineHeight: 18 }}
        style={styles.TEXTBOX}
        onFocus={() => {
          setTimeout(() => {
            flatList && flatList.scrollToEnd()
          }, 150)
        }}
      />
      <Button
        preset='small'
        tx='social.send'
        onPress={sendit}
        style={{ marginHorizontal: 10, height: 35 }}
      />
    </View>
  )

  return (
    <Screen
      key={`${id}-${authStore?.locale}`}
      preset='chatroom'
      dockHeight={0}
      dock={dock}
      transparent
    >
      <FlatList
        initialNumToRender={25}
        ref={(elm) => (flatList = elm)}
        data={messages}
        onContentSizeChange={() => flatList.scrollToEnd()}
        renderItem={({ item: message }) => (
          <Message
            message={message}
            preset={message.userId === id ? 'sent' : 'received'}
            setSelectedPlayer={playerStore.setSelectedPlayer}
          />
        )}
        keyExtractor={(message) => message.id.toString()}
      />
    </Screen>
  )
})
