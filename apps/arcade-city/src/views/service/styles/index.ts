import { Dimensions, Platform, TextStyle, ViewStyle } from 'react-native'
import { color, spacing } from '../../theme'
const { height } = Dimensions.get('window')

export const REQUEST_CONFIRM_CONTAINER: ViewStyle = {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#1c133a',
}

export const REQUEST_VIEW_CONTAINER: ViewStyle = {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
}

export const REQUEST_VIEW_OVERLAY: ViewStyle = {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#1c133a',
    opacity: 0.95,
    position: 'absolute',
}

export const ALL_REQUEST_DETAILS_CONTAINER: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    paddingTop: 20,

    borderTopWidth: 2,
    borderTopColor: color.line,
    paddingBottom: Platform.OS === 'android' ? 200 : 10,
}

export const SPACED_ROW: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
}

export const TEXTBOX: ViewStyle = {
    marginTop: spacing[0],
    width: '100%',
    paddingTop: spacing[0],
    paddingBottom: spacing[0],
    height: 44,
}

export const HEADER_SPACING: ViewStyle = {
    marginTop: 0,
}

export const BIG_HEADER_SPACING: ViewStyle = {
    marginTop: 35,
}

export const DOTTED_LINE: ViewStyle = {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    backgroundColor: color.active,
    height: 40,
}

export const ACTIVE_DOT: ViewStyle = {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: color.destination,
}

export const INACTIVE_DOT: ViewStyle = {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: color.primary,
}

export const SUB_PARENT: ViewStyle = {
    flex: 1,
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    justifyContent: 'space-between',
}
export const MAP: ViewStyle = {
    flex: 1,
}
export const FIND_DRIVER_BUTTON: ViewStyle = {
    alignSelf: 'center',
    width: '90%',
    height: 50,
    position: 'absolute',
    top: height * 0.72,
}

export const MIDDLE_IMAGE: ViewStyle = {
    height: 30,
    width: 30,
    position: 'absolute',
    alignSelf: 'center',
}

export const TEXT_INPUT_PARENT: ViewStyle = {
    height: 50,
    backgroundColor: color.field,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: color.primary,
}
export const TEXT_INPUT_PARENT_ACTIVE: ViewStyle = {
    height: 50,
    backgroundColor: color.field,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: color.destination,
}
export const SEARCH_LOCATION_BUTTON: ViewStyle = {
    height: 50,
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
}
export const DIVIDER: ViewStyle = {
    height: 50,
    width: 1,
    backgroundColor: color.primary,
}
export const ACTIVE_DIVIDER: ViewStyle = {
    height: 50,
    width: 1,
    backgroundColor: color.destination,
}
export const SEARCH_IMAGE: ViewStyle = {
    height: 32,
    width: 32,
}

export const PICKUP_DROP_BUTTON: ViewStyle = {
    justifyContent: 'center',
    height: 50,
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    flex: 0.9,
}

export const BUTTON_CONTAINER: ViewStyle = {
    paddingHorizontal: spacing[0],
    width: '30%',
    height: 35,
    minWidth: 10,
    minHeight: 20,
}
export const DISABLED_BUTTON_CONTAINER: ViewStyle = {
    paddingHorizontal: spacing[0],
    width: '30%',
    height: 35,
    minWidth: 10,
    minHeight: 20,
    backgroundColor: color.dim,
    opacity: 0.5,
}

export const BUTTON_TEXT: TextStyle = {
    fontSize: 12,
}

export const BUTTON_POPUP: TextStyle = {
    paddingHorizontal: spacing[0],
    width: '42%',
    height: 35,
    minWidth: 10,
    minHeight: 20,
}

export const OFFERIDER_TEXTBOX: TextStyle = {
    marginTop: 6,
    width: '94%',
    paddingTop: spacing[0],
    paddingBottom: spacing[0],
    height: 44,
}
export const OFFER_RIDE_CONTAINER: ViewStyle = {
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
}
export const OFFER_RIDE_POPUP_CONTAINER: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
}

export const MODAL_INSIDE_CONTAINER: ViewStyle = {
    backgroundColor: color.background,
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderRadius: 8,
}
export const MODAL_TEXT_INPUT_CONTAINER: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: color.background,
}

export const MODAL_BUTTONS_CONTAINER: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: color.background,
}

export const MODAL_TEXT_INPUT: ViewStyle = {
    marginTop: 6,
    width: '100%',
    padding: 10,
    backgroundColor: color.tabbar,
    borderRadius: 10,
    height: 80,
}

export const OFFER_RIDE_POPUP: ViewStyle = {
    backgroundColor: color.background,
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderRadius: 8,
}

export const OFFER_RIDE_INSIDE_CONTAINER: ViewStyle = {
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.tabbar,
    borderRadius: 8,
    height: 40,
}

export const POPUP_BUTTONS_CONTAINER: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
}
