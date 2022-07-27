import React from 'react'
import { Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { images, ImageName } from 'views/theme'

interface Props {
  name?: ImageName
  fontAwesome?: any
  style?: any
}

export const Icon = ({ name, fontAwesome, style }: Props) => {
  if (fontAwesome) {
    return (
      <FontAwesome
        name={fontAwesome}
        style={{ color: '#fff', fontSize: 18, ...style }}
      />
    )
  } else if (name) {
    const src: any = images[name]
    return <Image source={src} resizeMode='contain' style={style} />
  } else return null
}
