// @ts-nocheck
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import FlipCard from 'react-native-flip-card'
import { useStores } from 'stores'
import { Button, Screen, TextField } from 'views/shared'
import { translate } from 'i18n'

export const AddCard: React.FC<{}> = () => {
  // State
  const { authStore, serviceStore } = useStores()

  // UI
  const [flip, setFlip] = useState(false)

  return null
  return (
    <Screen key={authStore?.locale} preset='fixedStack'>
      <FlipCard
        flip={flip}
        flipHorizontal={true}
        flipVertical={false}
        friction={10}
        perspective={2000}
      >
        <Image
          source={require('./card-front.png')}
          style={{ marginTop: 60, width: '100%' }}
          resizeMode='contain'
        />
        <Image
          source={require('./card-back.png')}
          style={{ marginTop: 60, width: '100%' }}
          resizeMode='contain'
        />
      </FlipCard>
      <View style={{ flex: 1 }}>
        <TextField placeholder={translate('service.cardNumber')} />
        <Button
          // @TODO missing translation for 'Create dummy card'
          text='Create dummy card'
          onPress={() => serviceStore.createDummyCard()}
          style={{ marginBottom: 40 }}
        />
        <Button
          tx='service.flip'
          onPress={() => setFlip(!flip)}
          style={{ marginBottom: 40 }}
        />
      </View>
    </Screen>
  )
}
