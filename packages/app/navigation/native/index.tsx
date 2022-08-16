import React from 'react'
import { AuthedNavigator } from './authed'
import { UnauthedNavigator } from './unauthed'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

export const NativeNavigation = observer(() => {
  const { user } = useStores()
  return !!user.publicKey ? <AuthedNavigator /> : <UnauthedNavigator />
})
