import { color, palette } from '@arcadecity/ui'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'

export const MessageInput = () => {
  const [text, setText] = useState('')
  const submitInput = () => {
    if (text.length < 2) return
    console.log('submitting', text)
  }
  return (
    <View style={styles.container}>
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCorrect={false}
            multiline
            onChangeText={(text: string) => setText(text)}
            spellCheck={false}
            style={styles.inputBox}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={submitInput}
            style={styles.sendButtonContainer}>
            <FontAwesome name='send' size={24} color={palette.blueBell} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  composerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  container: {
    backgroundColor: palette.purple,
    borderTopWidth: 1,
    borderTopColor: palette.portGore,
    padding: 10,
    height: 60,
  },
  inputBox: {
    backgroundColor: color.field,
    color: color.text,
    flexGrow: 1,
    fontSize: 14,
    height: 40,
    borderRadius: 10,
    includeFontPadding: false,
    padding: 10,
    textAlignVertical: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 6,
  },
  sendButtonContainer: {
    marginLeft: 14,
  },
})
