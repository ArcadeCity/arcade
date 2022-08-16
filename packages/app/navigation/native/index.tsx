import React, { useMemo } from 'react'
import { useAccount } from '@arcadecity/use-arcade'
import { AuthedNavigator } from './authed'
import { UnauthedNavigator } from './unauthed'

export function NativeNavigation() {
  const [account] = useAccount()
  const authed = useMemo(() => !!account, [account])
  return authed ? <AuthedNavigator /> : <UnauthedNavigator />
}
