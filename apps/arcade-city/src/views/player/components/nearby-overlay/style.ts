import { ViewStyle } from 'react-native'
import { color } from 'views/theme'

export const CONTAINER: ViewStyle = {
  position: 'absolute',
  bottom: 66,
  left: 15,
  right: 15,
  justifyContent: 'center',
  alignItems: 'center',
}

export const DRIVEROVERLAY: ViewStyle = {
  ...CONTAINER,
  bottom: 30,
  top: 50,
  backgroundColor: color.background,
  borderRadius: 8,
  padding: 20,
  shadowOpacity: 0.8,
  shadowRadius: 12,
  shadowColor: 'rgba(91, 32, 242, 0.2)',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  borderWidth: 2,
  borderColor: color.palette.portGore,
  zIndex: 9999,
}

export const CLOSEBTN: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 16,
  zIndex: 9999,
}

export const OPENBTN: ViewStyle = {
  position: 'absolute',
  top: 42,
  left: 0,
  padding: 16,
  shadowOpacity: 0.8,
  shadowRadius: 12,
  shadowColor: 'rgba(91, 32, 242, 0.2)',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  zIndex: 8000,
}
