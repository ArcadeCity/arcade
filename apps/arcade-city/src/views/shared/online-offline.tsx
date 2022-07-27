import React from 'react'
import { observer } from 'mobx-react-lite'
import { Switch } from '.'

export const OnlineOffline: React.FC<{}> = observer(() => {
  // const hasBeacon = playerStore?.doesCurrentUserHavePlayerBeacon
  const hasBeacon = false
  const toggleStatus = () => {} // serviceStore?.toggleOnline() ??

  return <Switch value={hasBeacon} onToggle={toggleStatus} />
})
