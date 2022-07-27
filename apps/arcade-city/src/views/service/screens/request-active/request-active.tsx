// We display the request and relevant info/actions in overlays. Rider only.

import React from 'react'
import { observer } from 'mobx-react-lite'
import { RequestMap, RequestOverlay } from '../../components'

export const RequestActive: React.FC<{}> = observer(() => (
  <>
    <RequestOverlay />
    <RequestMap />
  </>
))
