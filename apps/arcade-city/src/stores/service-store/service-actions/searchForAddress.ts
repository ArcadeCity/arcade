import * as Location from 'expo-location'
import { display, log } from 'lib'
import { getRoot } from 'mobx-state-tree'
import { RootStore } from 'stores/root-store'
import { ServiceStore } from '../service-store'

export const searchForAddress = async (self: ServiceStore, searchString: string) => {
  display({
    name: 'searchForAddress',
    preview: `About to search: ${searchString}`,
  })

  const root = getRoot(self) as RootStore
  const userCoords = root.authStore.coords

  console.log('Attempting to search for address:', searchString)

  const res: any = await self.env.mapbox.getAddressFromLocation(searchString, userCoords)
  console.log(res)
}

//   // display({
//   //   name: 'searchForAddress',
//   //   preview: `Mapbox response!`,
//   //   value: res,
//   // })

//   // try {
//   //   self.setAddressSearchResults(res?.features)
//   // } catch (e) {
//   //   log(e && e.message)
//   // }

//   return true
// }
