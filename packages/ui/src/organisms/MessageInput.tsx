import { color, palette } from '../theme'
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import React, { useContext, useRef, useState } from 'react'
import {
  ArcadeContext,
  useActiveChannelId,
  UseArcadeRelayActions,
} from '@arcadecity/use-arcade/src'

export const MessageInput = () => {
  const [text, setText] = useState('Bro')
  const context = useContext(ArcadeContext) as any
  const activeChannelId = useActiveChannelId()
  const actions = context.actions as UseArcadeRelayActions
  const inputBoxRef = useRef<TextInput | null>(null)
  const submitInput = () => {
    if (text.length < 1) {
      Alert.alert('Message too short', 'What is that, a message for ants?')
      return
    }
    if (!activeChannelId) {
      Alert.alert('Error getting channel ID')
      return
    }
    // inputBoxRef.current?.clear()
    // setText('')
    actions.sendChannelMessage(activeChannelId, text)
  }
  return (
    <View style={styles.container}>
      <View style={styles.composerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCorrect={false}
            defaultValue='Bro'
            multiline
            editable={false}
            // disabled={true}
            // onChangeText={(text: string) => setText(text)}
            ref={inputBoxRef}
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
    flex: 1,
    height: 60,
    width: '100%',
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
    outlineWidth: 0,
    opacity: 0.5,
  },
  inputContainer: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  sendButtonContainer: {
    marginLeft: 14,
  },
})
