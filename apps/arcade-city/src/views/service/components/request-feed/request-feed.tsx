import React from 'react'
import { FlatList, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { usePlayerResolver } from 'lib/hooks'
import { useStores } from 'stores'
import { Loading } from 'views/loading'
import { spacing } from 'views/theme'
import { RequestDetail } from '../request-detail'
import { translate } from 'i18n'

export const RequestFeed: React.FC<{}> = observer(() => {
  // State
  const { authStore, serviceStore } = useStores()
  const requests = serviceStore.sortedRequests
  const isServiceProvider = authStore.isServiceProvider
  const noneMessage = isServiceProvider
    ? translate('service.noRequestsArea')
    : translate('service.noRequestsYet')

  // Data
  const { loadedAllPlayers } = usePlayerResolver({ requests })
  if (!loadedAllPlayers) return <Loading message={translate('common.loading')} />
  if (requests.length === 0) return <Loading message={noneMessage} />

  return (
    <View key={`${noneMessage}-${authStore?.locale}`} style={{ paddingHorizontal: spacing[3] }}>
      <FlatList
        data={requests}
        initialNumToRender={25}
        keyExtractor={(request) => request.id.toString()}
        renderItem={({ item: request }) => (
          <View style={{ marginVertical: 10 }}>
            <RequestDetail request={request} />
          </View>
        )}
      />
    </View>
  )
})
