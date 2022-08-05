import { color } from '@arcadecity/ui'
import {
  ArcadeContext,
  formatEvent,
  updateChannelMetadata,
  useChannelMetadata,
} from '@arcadecity/use-arcade'
import { useNavigation } from '@react-navigation/native'
import { useContext, useRef, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function ModalScreen() {
  const metadata = useChannelMetadata()
  const navigation = useNavigation()
  const [name, setName] = useState(metadata.name)
  const [picture, setPicture] = useState(metadata.picture)
  const inputBoxRef = useRef<TextInput | null>(null)
  const context = useContext(ArcadeContext)
  const updateMetadata = async () => {
    // TODO: get channelID properly now that we are storing channelId in tag not prop
    const event = await updateChannelMetadata(metadata.tags[0][1], { name, picture })
    const formattedEvent = formatEvent(event)
    context.ws.send(formattedEvent)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          autoCorrect={false}
          defaultValue={metadata.name}
          onChangeText={(text: string) => setName(text)}
          ref={inputBoxRef}
          spellCheck={false}
          style={styles.inputBox}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCorrect={false}
          defaultValue={metadata.picture}
          onChangeText={(text: string) => setPicture(text)}
          ref={inputBoxRef}
          spellCheck={false}
          style={styles.inputBox}
        />
      </View>
      <Button title='Update channel metadata' onPress={updateMetadata} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
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
