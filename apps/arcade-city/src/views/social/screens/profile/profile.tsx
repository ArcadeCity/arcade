import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useStores } from 'stores'
import { Loading } from 'views/loading'
import { Button, Screen } from 'views/shared'
import { ProfileSummary } from '../../components'

export const Profile: React.FC<{}> = observer(() => {
  // Nav
  const { navigate, setOptions } = useNavigation<any>()
  const { params }: any = useRoute()
  const username =
    params && params.hasOwnProperty('username')
      ? params.username
      : 'Unknown user'
  useEffect(() => {
    setOptions({ title: `Profile: ${username}` })
  }, [])

  // state
  const { authStore, chatStore, playerStore } = useStores()
  useEffect(() => {
    if (
      playerStore.selectedPlayer &&
      playerStore.selectedPlayer.username === username
    )
      return
    playerStore.getPlayerByUsername(username)
  }, [username])
  const selectedPlayer = playerStore.selectedPlayer
  const notCurrentUser = selectedPlayer?.id !== authStore.id

  // Ensure we have the player object (via selectedPlayer) before continuing
  if (
    !selectedPlayer ||
    (selectedPlayer && selectedPlayer.username !== username)
  ) {
    return <Loading message='Loading player' />
  }

  const {
    bio,
    city,
    id: playerId,
    level,
    profession,
    profilePicture,
    username: playerUsername,
  }: any = playerStore.selectedPlayer // ???

  return (
    <Screen preset='scrollStack'>
      <ProfileSummary
        avatar={profilePicture}
        level={level}
        city={city}
        profession={profession}
        username={playerUsername}
        bio={bio}
      />
      {notCurrentUser ? (
        <Button
          tx='social.openChat'
          text='Open Chat'
          onPress={() => {
            chatStore.openChatWithPlayer(playerId)
            navigate('inbox', { screen: 'chatroom' })
          }}
        />
      ) : (
        <Button
          tx='social.editProfile'
          text='Edit Profile'
          onPress={() => {
            navigate('menu', { screen: 'profileEdit' })
          }}
        />
      )}
    </Screen>
  )
})
