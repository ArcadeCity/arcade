import * as React from 'react'
import { View } from 'react-native'
import { Player } from 'stores/player-store'
import { Avatar, Button, Text } from 'views/shared'

interface Props {
  player: Player
  withButtons?: boolean
}

export const PlayerDetail = ({ player, withButtons }: Props) => {
  const levelAndClass = `Level ${player.level} ${player.profession}`

  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 15, width: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Avatar
          preset='s64x64'
          uri={player.profilePicture ?? undefined}
          style={{ marginTop: 5 }}
        />
        <View
          style={{
            paddingLeft: 20,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text preset='bold' text={player.username} />
          <View>
            <Text
              preset='description'
              text={levelAndClass}
              style={{ marginBottom: 0 }}
              numberOfLines={1}
              ellipsizeMode='tail'
            />
          </View>
        </View>
        <View
          style={{
            paddingLeft: 20,
            flexGrow: 1,
            marginTop: 4,
            justifyContent: 'center',
          }}
        ></View>
      </View>
      {withButtons && (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            tx='social.viewProfile'
            style={BUTTONS}
            // onPress={() => navigate('inbox', { screen: 'profile' })}
          />
          <Button
            tx='social.openChat'
            style={BUTTONS}
            preset='purpleglow'
            // onPress={() => openChatWithPlayer(player.uid)}
          />
        </View>
      )}
    </View>
  )
}

const BUTTONS = {
  width: '44%',
  marginHorizontal: 10,
}
