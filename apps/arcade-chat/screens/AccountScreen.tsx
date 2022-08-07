import { color, Text } from '@arcadecity/ui'
import { hexToNpub, hexToNsec, useAccount } from '@arcadecity/use-arcade'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import * as Clipboard from 'expo-clipboard'

export default function AccountScreen() {
  const [account, accountActions] = useAccount()
  if (!account || !account.keys || !account.keys.publicKey) return <></>

  const npubkey = hexToNpub(account.keys.publicKey)
  const nseckey = hexToNsec(account.keys.privateKey)
  const mnemonic = account.keys.mnemonic

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
    Alert.alert('Private key copied to clipboard!')
  }

  const logout = async () => {
    console.log('Logging out...')
    await accountActions.logout()
    console.log('Logged out!')
  }

  return (
    <View style={styles.container}>
      {!account && <Text text='Loading' preset='title' />}
      {account && (
        <>
          <Text text='Account' preset='title' style={{ marginTop: -40 }} />
          <Text
            text='Testing bech32/bip39 key generation'
            preset='description'
            style={{ marginBottom: 40 }}
          />
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={copyPublicKey}>
              <Text text='Public key' preset='header' />
              <Text text={npubkey} preset='description' />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={copyPrivateKey}>
              <Text text='Private key' preset='header' />
              <Text text={nseckey} preset='description' />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={copyMnemonic}>
              <Text text='Mnemonic' preset='header' />
              <Text text={mnemonic} preset='description' />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={logout}>
              <Text text='Logout/Reset' preset='header' />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
