import { navigate } from 'navigation/navigation-utilities'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'stores'
import { Player } from 'stores/player-store'
import { Avatar, Text } from 'views/shared'
import { SvgIcon } from 'views/shared/svg-icon'
import { PayIcon } from 'views/shared/svg-icon/pay-icon'
import { palette } from 'views/theme'
import { Feather } from '@expo/vector-icons'
import { Button } from '../Button'

interface Props {
  player: Player
  withButtons?: boolean
}

export const PlayerDetail = ({ player, withButtons }: Props) => {
  const levelAndClass = `Level ${player.level} ${player.profession}`
  const { chatStore } = useStores()
  return (
    <View style={{ paddingHorizontal: 0, paddingVertical: 15, width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   alignItems: 'center',
          //   alignContent: 'flex-start',
        }}
      >
        <Avatar
          preset='s48x48'
          uri={player.profilePicture ?? undefined}
          style={{ marginTop: 5 }}
        />
        <View
          style={{
            paddingLeft: 20,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: 170,
          }}
        >
          <Text preset='bold' text={player.username} style={{ fontSize: 18 }} />
          <View>
            <Text
              preset='descriptionSlim'
              text={levelAndClass}
              style={{ marginBottom: 0 }}
              numberOfLines={1}
              ellipsizeMode='tail'
            />
          </View>
          <View>
            <Text
              preset='description'
              text={player.city}
              style={{ marginBottom: 0 }}
              numberOfLines={2}
              ellipsizeMode='tail'
            />
          </View>
        </View>
        <View
          style={{
            paddingLeft: 20,
            flexGrow: 1,
            marginTop: -12,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={0.8}
            onPress={() => chatStore.openChatWithPlayer(player.id)}
          >
            <Feather
              name={'message-square'}
              color={palette.blueBell}
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              // paddingTop: 5,
            }}
            activeOpacity={0.8}
            onPress={() =>
              navigate('wallet', {
                screen: 'pay',
                params: { username: player.username },
              })
            }
          >
            <PayIcon />
            {/* <SvgIcon /> */}
            {/* <Feather name={'menu'} color={palette.blueBell} size={28} /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginTop: 4,
          marginLeft: 15,
          //   justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>"{player.bio}"</Text>
      </View>
    </View>
  )
}
