import React, { useEffect, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { useStores } from 'stores'
import { usePlayerResolver } from 'lib/hooks'
import { Player } from 'stores/player-store'
import { ServiceRequest } from 'stores/service-store'
import { Loading } from 'views/loading'
import { Button, Screen, TextField } from 'views/shared'
import { Message } from 'views/social'
import { RequestStatusBar } from '../../components/request-status-bar'
import * as styles from './styles'
import { translate } from 'i18n'
import { capitalize } from 'lodash'

export const RequestChat: React.FC<{}> = observer(() => {
  // Nav
  const { setOptions } = useNavigation<any>()
  useEffect(() => {
    setOptions({ title: 'Request Chat' })
  }, [])

  // State
  const { authStore, chatStore, playerStore, serviceStore } = useStores()

  // State
  const chatrooms = chatStore.chatrooms

  // Form
  const { register, setValue } = useForm()
  const [state, update] = useState('')

  useEffect(() => {
    register('message')
  }, [register])

  // Ensure all players loaded
  const { loadedAllPlayers } = usePlayerResolver({ chatrooms })
  if (!loadedAllPlayers) return <Loading message='Loading' />

  const request: ServiceRequest | undefined = serviceStore.activeRequest
  if (!request || !request.chatroom) return null
  const messages = request.chatroom.messages
  console.log('Message force update', messages.length)
  const chatroomId = request?.chatroom.id
  const userId = authStore.id

  const selectDriver = (driver: Player) =>
    Alert.alert(
      translate('service.confirmDriver'),
      translate('service.confirmDriverExplainer', {
        username: driver.username,
      }),
      [
        {
          text: capitalize(translate('common.no')),
        },
        {
          text: capitalize(translate('common.yes')),
          onPress: () => serviceStore.selectDriver(driver.id),
        },
      ]
    )

  const unselectDriver = (driver: Player) =>
    Alert.alert(
      translate('service.unselectDriver'),
      translate('service.unselectDriverExplainer', {
        username: driver.username,
      }),
      [
        {
          text: capitalize(translate('common.no')),
        },
        {
          text: capitalize(translate('common.yes')),
          style: 'destructive',
          onPress: () => serviceStore.unselectDriver(driver.id),
        },
      ]
    )

  const sendit = () => {
    chatStore.messageSend(state, chatroomId)
    update('')
    setValue('message', '')
  }

  // UI
  let flatList: any

  const dock = (
    <View style={styles.DOCK}>
      <TextField
        placeholder='Enter message'
        onChangeText={(text: string) => {
          update(text)
          setValue('message', text)
        }}
        value={state}
        autoCorrect={false}
        inputStyle={{ lineHeight: 24 }}
        style={styles.TEXTBOX}
        onFocus={() => {
          setTimeout(() => {
            flatList && flatList.scrollToEnd()
          }, 150)
        }}
      />
      <Button
        preset='small'
        text='Send'
        onPress={sendit}
        style={{ marginHorizontal: 10, height: 35 }}
      />
      {/* <TouchableOpacity
                onPress={sendit}
                style={styles.SENDBUTTON}
                // disabled={messageToSend.trim().length > 0 ? false : true}
            >
                <Text text="Send" preset="bold" style={{}} />
            </TouchableOpacity> */}
    </View>
  )

  return (
    <Screen
      key={`${userId}-${authStore?.locale}`}
      preset='chatroom'
      dockHeight={0}
      dock={dock}
    >
      {(request.playerRequesting?.id === userId ||
        request.playerClaiming?.id === userId) && (
        <RequestStatusBar request={request} />
      )}

      <FlatList
        initialNumToRender={25}
        ref={(elm) => (flatList = elm)}
        data={messages}
        onContentSizeChange={() => flatList.scrollToEnd()}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item: message }: { item: any }) => (
          <View>
            <Message
              message={message}
              setSelectedPlayer={playerStore.setSelectedPlayer}
              preset={
                message.userId.toString() === userId ? 'sent' : 'received'
              }
            />
            {request.status === 'awaiting_drivers' &&
              request.playerRequesting?.id !== message.player.id &&
              message.player.profession !== 'Bot' && (
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: -32,
                  }}
                >
                  <Button
                    preset='small'
                    tx='service.selectThisDriver'
                    onPress={() => selectDriver(message.player)}
                  />
                </View>
              )}

            {request.status === 'claimed' &&
              request.playerRequesting?.id === userId &&
              request.playerRequesting?.id !== message.player.id &&
              message.player.profession !== 'Bot' && (
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: -32,
                  }}
                >
                  <Button
                    preset='small'
                    tx='service.unselectThisDriver'
                    onPress={() => unselectDriver(message.player)}
                  />
                </View>
              )}
          </View>
        )}
      />
    </Screen>
  )
})
