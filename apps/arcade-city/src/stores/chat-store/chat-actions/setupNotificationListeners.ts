import * as Notifications from 'expo-notifications'

export const setupBroadcastListeners = async (self: any) => {
  /** Set up expo-notifications listeners */
  Notifications.addNotificationReceivedListener((notification) => {
    // setNotification(notification);
    console.log('WHAT THE FUCK IS THIS notification', notification)
  })

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('WHAT THE FUCK IS THIS RESPONSE', response)
  })

  /** Set up notifee listeners */
  // https://github.com/notifee/react-native-notifee/issues/146
  // notifee.onForegroundEvent(async ({ type, detail }: any) => {
  //   const { notification } = detail
  //   console.log('onForegroundEvent type:', type)
  //   console.log('onForegroundEvent detail:', detail)
  //   handleNotification(notification, type)
  // })

  // notifee.onBackgroundEvent(async ({ type, detail }) => {
  //   const { notification } = detail
  //   console.log('onBackgroundEvent type:', type)
  //   console.log('onBackgroundEvent detail:', detail)
  //   notification && handleNotification(notification, type)
  // })

  // const handleNotification = (notification: Notification, type: EventType) => {
  //   console.log('HANDLING NOTIFICATION:', type, notification)
  //   // console.log('of type:', type)

  //   switch (type) {
  //     case EventType.PRESS:
  //       const { data } = notification
  //       if (
  //         data &&
  //         data.action &&
  //         data.chatroomId &&
  //         data.action === 'setActiveChatroom'
  //       ) {
  //         self.setActiveChatroom(data.chatroomId)
  //         root.authStore.navTo('chatroom')
  //       }
  //       break
  //   }
  // }
}
