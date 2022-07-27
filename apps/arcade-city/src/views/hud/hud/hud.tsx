import React from 'react'

export const Hud = () => <></>

// import { observer } from 'mobx-react-lite'
// import React, { useEffect } from 'react'
// import { StyleSheet, View } from 'react-native'
// import { useStores } from 'stores'
// // import { HudStatus, PanelName } from 'stores/hud-store'
// import { OPENBTN } from 'views/beta/beta-overlay/style'
// import { Button, Icon } from 'views/shared'
// import { palette } from 'views/theme'
// import { Feather } from '@expo/vector-icons'

// export const Hud = observer(() => {
//   const { hudStore } = useStores()
//   const status = hudStore.status

//   useEffect(() => {
//     hudStore.reset()
//   }, [])

//   if (status === HudStatus.SHOWING_PANEL) {
//     return null
//   }

//   return (
//     <View style={{ ...OPENBTN, left: 0 }}>
//       <Button
//         preset='purpleglow'
//         icon
//         // withIcon='users'
//         onPress={() => hudStore.openPanel(PanelName.NEARBY)}
//       >
//         {/* <Icon name='users' /> */}
//         <Feather name='users' size={24} color={palette.moonRaker} />
//       </Button>
//       {/* <Button
//         hud
//         withIcon='users'
//         onPress={() => hudStore.openPanel(PanelName.NEARBY)}
//       /> */}
//     </View>
//   )
// })

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     width: 50,
//   },
// })
