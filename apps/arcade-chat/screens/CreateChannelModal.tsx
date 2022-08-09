import { color, palette, Text } from '@arcadecity/ui'
import {
  ArcadeContext,
  formatEvent,
  updateChannelMetadata,
  UseArcadeRelayActions,
  useChannelMetadata,
} from '@arcadecity/use-arcade'
import { useNavigation } from '@react-navigation/native'
import { useContext, useRef, useState } from 'react'
import { Button, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

export const CreateChannelModal = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [picture, setPicture] = useState('')
  const inputBoxRef = useRef<TextInput | null>(null)
  const context = useContext(ArcadeContext)
  const actions = context.actions as UseArcadeRelayActions
  const createChannel = async () => {
    console.log(name, picture)
    actions.createChannel(name, about, picture)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text text='Channel name' preset='header' />
        <TextInput
          autoCorrect={false}
          onChangeText={(text: string) => setName(text)}
          placeholder='Enter channel name'
          placeholderTextColor={palette.blueBell}
          ref={inputBoxRef}
          spellCheck={false}
          style={styles.inputBox}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text text='About' preset='header' />
        <TextInput
          autoCorrect={false}
          onChangeText={(text: string) => setAbout(text)}
          placeholder='Enter about'
          placeholderTextColor={palette.blueBell}
          ref={inputBoxRef}
          spellCheck={false}
          style={styles.inputBox}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text text='Picture' preset='header' />
        <TextInput
          autoCorrect={false}
          onChangeText={(text: string) => setPicture(text)}
          placeholder='Enter picture URL (optional)'
          placeholderTextColor={palette.blueBell}
          ref={inputBoxRef}
          spellCheck={false}
          style={styles.inputBox}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={createChannel}
        style={{
          backgroundColor: palette.electricIndigo,
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 30,
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text text='Create channel' preset='header' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    paddingTop: 30,
    justifyContent: 'center',
    backgroundColor: color.background,
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
    marginTop: 8,
  },
  inputContainer: {
    // flex: 1,

    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: color.background,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    color: color.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
