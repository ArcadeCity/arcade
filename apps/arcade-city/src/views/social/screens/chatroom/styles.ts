import { ViewStyle } from 'react-native'
import { spacing } from 'views/theme'

export const DOCK: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: '#221b43',
  alignItems: 'center',
  justifyContent: 'center',
}

export const CONTAINER: ViewStyle = {
  paddingBottom: 90, // spacing[7], // 2 looks best but ehh padding thing
  paddingTop: spacing[5],
}

export const SENDBUTTON: ViewStyle = {
  marginVertical: 0,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
}

export const TEXTBOX: ViewStyle = {
  marginLeft: spacing[4],
  marginVertical: 0,
  paddingVertical: 0,
  width: '75%',
}
