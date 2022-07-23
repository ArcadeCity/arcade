import { useStore } from './store'
import { NostrEvent, NostrKind } from './types'

export const handle = (event: NostrEvent) => {
  useStore.getState().addEvent(event)
  // switch (event.kind) {
  //   case NostrKind.text:
  //     const date = new Date(event.created_at * 1000)
  //     console.log(event.kind, date.toLocaleString())
  //     break
  //   default:
  //     break
  // }
}
