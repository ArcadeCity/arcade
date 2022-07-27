import { values } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { View as Panel } from 'react-native'
import { useStores } from 'stores'
import { PlayerDetail } from 'views/hud/PlayerDetail'
import { Text } from 'views/shared'

let fetched = 0

export const Nearby = observer(() => {
  const { authStore, playerStore } = useStores()
  const players = playerStore.nearbyPlayers
  useEffect(() => {
    fetched = fetched + 1
    if (fetched > 3) return
    playerStore.getNearby(authStore.coords.latitude, authStore.coords.longitude)
  }, [authStore.coords.latitude])
  return (
    <Panel>
      {authStore.coords.latitude === 0 && authStore.coords.longitude === 0 && (
        <Text
          text="We don't have your location - showing unsorted"
          preset='description'
          style={{ textAlign: 'center' }}
        />
      )}

      {players.map((player: any, i) => (
        <PlayerDetail key={i} player={player} />
      ))}
    </Panel>
  )
})
