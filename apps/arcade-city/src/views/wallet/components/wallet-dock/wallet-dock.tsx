import { translate } from 'i18n'
import { capitalize } from 'lodash'
import React from 'react'
import { View } from 'react-native'
import { Button } from 'views/shared'
import { palette } from 'views/theme'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export const WalletDock = () => {
  const { navigate } = useNavigation<any>()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
      }}
    >
      <Button
        preset='primary'
        text={capitalize(translate('service.request'))}
        style={{ flex: 1, marginRight: 10 }}
        hasIcon={
          <Feather
            name='arrow-down-right'
            size={22}
            color={palette.moonRaker}
            style={{ marginLeft: -5 }}
          />
        }
        onPress={() => navigate('request')}
      />
      <Button
        preset='purpleglow'
        text='Pay'
        style={{ flex: 1, marginLeft: 10 }}
        hasIcon={
          <Feather
            name='arrow-up-right'
            size={22}
            color={palette.moonRaker}
            style={{ marginLeft: -10 }}
          />
        }
        onPress={() => navigate('pay')}
      />
    </View>
  )
}
