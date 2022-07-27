import { translate } from 'i18n'
import { capitalize } from 'lib/util'
import { flatten } from 'ramda'
import { Text as RNText } from 'react-native'
import { presets } from './Text.presets'
import { TextProps } from './Text.props'

export const Text = ({
  capitalize: capitalized = false,
  children,
  preset = 'default',
  style: styleOverride,
  text,
  tx,
  txOptions,
}: TextProps) => {
  const i18nText = tx && translate(tx, txOptions)
  const whichText = i18nText || text || ''
  const newText = capitalized ? capitalize(whichText) : whichText
  const content = newText || children
  const style = presets[preset] || presets.default
  const styles = flatten([style, styleOverride])
  return <RNText style={styles}>{content}</RNText>
}
