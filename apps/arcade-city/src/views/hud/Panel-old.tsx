import { Pressable, Text, View } from 'react-native'
import { typography } from 'views/theme'

export const Panel = ({ children, toggle }) => {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        marginTop: -30,
      }}
    >
      <View
        style={{
          //   flex: 1,
          marginTop: 90,
          marginHorizontal: 20,
          padding: 20,
          backgroundColor: 'rgba(6,61,62,0.8)',
          borderWidth: 1,
          borderColor: '#01F7F8',
          borderRadius: 5,
        }}
      >
        <>
          <View
            style={{
              zIndex: 8000,
              width: 30,
              height: 30,
              position: 'absolute',
              top: 0,
              right: 0,
              marginTop: 10,
              marginRight: -1,
            }}
          >
            <Pressable style={{ width: 30, height: 30 }} onPress={toggle}>
              <Text
                style={{
                  color: 'rgb(17,111,112)',
                  fontFamily: typography.bold,
                  fontSize: 20,
                  letterSpacing: 1,
                }}
              >
                X
              </Text>
            </Pressable>
          </View>
          {children}
        </>
      </View>
    </View>
  )
}
