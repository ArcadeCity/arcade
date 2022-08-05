import { color, Text } from '@arcadecity/ui'
import { hexToNpub, hexToNsec, useAccount } from '@arcadecity/use-arcade'
import { StyleSheet, View } from 'react-native'

export default function AccountScreen() {
  const account = useAccount()
  console.log(account)
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
          <View>
            <Text text='Public key' preset='header' />
            <Text text={hexToNpub(account.keys.publicKey)} preset='description' />
            <Text text='Private key' preset='header' />
            <Text text={hexToNsec(account.keys.privateKey)} preset='description' />
            <Text text='Mnemonic' preset='header' />
            <Text text={account.keys.mnemonic} preset='description' />
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
