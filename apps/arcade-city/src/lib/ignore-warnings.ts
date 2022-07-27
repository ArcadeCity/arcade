/**
 * Ignore some yellowbox warnings.
 */
import { LogBox } from 'react-native'

if (__DEV__) {
  const ignoreWarns = [
    'No native splash screen registered',
    'An error occurred while getting app settings',
    'Non-serializable values were found in the navigation state.',
    'Possible Unhandled Promise Rejection',
    '[bugsnag] RedeliveryLoop error',
    'ViewPropTypes will be removed',
    'o is not a function',
    'Mapbox error MapLoad error',
    'Story ids need to be unique',
    'Task orphaned',
    'Network request failed',
    '`new NativeEventEmitter', // https://stackoverflow.com/questions/69538962/new-nativeeventemitter-was-called-with-a-non-null-argument-without-the-requir
    'Story with id',
    'Consecutive calls to connectUser is detected',
    // 'An error occurred while getting app settings: Error: Both secret and user tokens',
    // 'asmCrypto',
    // 'Module Tor requires',
    // 'WARNING: Multiple instances of Three.js being imported.',
    // '[expo-notifications]',
    // 'Warning: Each child in a list',
    // 'Cannot update a component',
    // "Can't perform",
    // 'VirtualizedLists',
    // '[mobx-state-tree] You are trying to read',
    // 'Did not receive response to',
    // 'Failed prop type: Invalid',
    // 'Sending',
    // 'JSON Parse error: Unr',
  ]

  const warn = console.warn
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return
      }
    }
    warn(...arg)
  }

  LogBox.ignoreLogs(ignoreWarns)

  // const ignoreLogs = []

  const error = console.error
  console.error = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return
      }
    }
    error(...arg)
  }

  // const log = console.log
  // console.log = (...arg) => {
  //   for (const warning of ignoreLogs) {
  //     if (arg[0].startsWith(warning)) {
  //       return
  //     }
  //   }
  //   log(...arg)
  // }
}
