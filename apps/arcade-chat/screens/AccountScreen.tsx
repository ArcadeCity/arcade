import { color, palette, Text } from '@arcadecity/ui'
import { AccountMetadata, hexToNpub, hexToNsec, store, useAccount } from '@arcadecity/use-arcade'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { useState } from 'react'

export default function AccountScreen() {
  const [loginAs, setLoginAs] = useState('')
  const [account, accountActions] = useAccount()
  if (!account || !account.keys || !account.keys.publicKey) return <></>

  const npubkey = hexToNpub(account.keys.publicKey)
  const nseckey = hexToNsec(account.keys.privateKey)
  const mnemonic = account.keys.mnemonic

  const changeProfile = () => {
    const newUsername = `ArcadeAnon-${Math.random().toString(36).substring(2, 6)}`
    const newAbout = Math.random().toString(36).substring(2, 16)
    const newNumber = Math.floor(Math.random() * 99) + 1
    const newGender = Math.floor(Math.random() * 2)
    const newPicture = `https://randomuser.me/api/portraits/${
      newGender ? 'men' : 'women'
    }/${newNumber}.jpg`

    const metadata: AccountMetadata = {
      name: newUsername,
      about: newAbout,
      picture: newPicture,
    }
    store.accountMetadata = metadata
  }

  console.log(account)

  const copyPublicKey = async () => {
    await Clipboard.setStringAsync(npubkey)
    Alert.alert('Public key copied to clipboard!')
  }

  const copyPrivateKey = async () => {
    await Clipboard.setStringAsync(nseckey)
    Alert.alert('Private key copied to clipboard!')
  }

  const copyMnemonic = async () => {
    await Clipboard.setStringAsync(mnemonic)
    Alert.alert('Seed phrase copied to clipboard!')
  }

  const login = () => {
    console.log('logging in as', loginAs)
    if (loginAs.split(' ').length === 12) {
      accountActions.login({ mnemonic: loginAs })
    } else if (loginAs.startsWith('nsec')) {
      accountActions.login({ nsec: loginAs })
    } else {
      accountActions.login({ nsec: hexToNsec(loginAs) })
    }
  }

  const logout = async () => {
    console.log('Logging out...')
    await accountActions.logout()
    console.log('Logged out!')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!account && <Text text='Loading' preset='title' />}
      {account && (
        <>
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <View style={{ flexDirection: 'row', marginBottom: 50 }}>
              <Image
                source={{ uri: account.metadata.picture }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 20,
                }}
              >
                <Text text={account.metadata.name} preset='header' />
                <Text text={account.metadata.about} preset='descriptionSlim' />
              </View>
            </View>

            {/* <Text text={account.metadata.picture} preset='description' /> */}

            <TouchableOpacity activeOpacity={0.8} onPress={copyPublicKey}>
              <Text text='Public key' preset='header' />
              <Text text={npubkey} preset='description' />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={copyPrivateKey}>
              <Text text='Private key' preset='header' />
              <Text text={nseckey} preset='description' />
            </TouchableOpacity>
            {mnemonic && (
              <TouchableOpacity activeOpacity={0.8} onPress={copyMnemonic}>
                <Text text='Seed phrase' preset='header' />
                <Text text={mnemonic} preset='description' />
              </TouchableOpacity>
            )}

            <TextInput
              onChangeText={(text) => setLoginAs(text)}
              placeholder='Enter hex, nsec, or seed phrase'
              placeholderTextColor={palette.blueBell}
              style={{
                backgroundColor: color.field,
                borderRadius: 20,
                color: color.text,
                padding: 16,
                marginVertical: 30,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={changeProfile}
              style={{ marginBottom: 30 }}
            >
              <Text text='Change profile info' preset='header' />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={login} style={{ marginBottom: 30 }}>
              <Text text='Login' preset='header' />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={logout}>
              <Text text='Logout/Reset' preset='header' />
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.background,
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
