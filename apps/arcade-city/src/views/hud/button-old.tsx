import { Text, TouchableOpacity } from 'react-native'
import { typography } from 'views/theme'

export const Button = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'rgba(6,61,62,0.8)',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: '#01F7F8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text
        style={{
          color: '#01F7F8',
          fontFamily: typography.bold,
          fontSize: 20,
          letterSpacing: 1,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
