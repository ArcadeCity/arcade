import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Screen } from 'views/shared'
import { RequestFeed } from 'views/service/components/request-feed'
import { translate } from 'i18n'

export const ServiceHome: React.FC<{}> = observer(() => {
  // State
  const { authStore } = useStores()
  const isServiceProvider = authStore.isServiceProvider

  // Nav
  const { setOptions } = useNavigation<any>()
  useEffect(() => {
    const title = isServiceProvider
      ? translate('service.serviceRequestFeed')
      : translate('service.yourServiceRequests')
    setOptions({ title })
  }, [isServiceProvider])

  return (
    <Screen key={`${authStore?.locale}`} preset='fixedStackSlim'>
      <RequestFeed />
    </Screen>
  )
})
