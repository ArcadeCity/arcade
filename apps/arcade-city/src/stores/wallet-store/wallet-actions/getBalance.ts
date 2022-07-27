import { AuthApi } from 'services/api/auth-api'
import { WalletStore } from '../wallet-store'

export const getBalance = async (self: WalletStore) => {
  const key = self.wallet.invoice_key
  if (!key) {
    console.log('No invoice key')
    return false
  }

  const res = await fetch(`https://2342c8b04a.d.voltageapp.io/api/v1/wallet`, {
    headers: {
      'X-Api-Key': key,
    },
  })
  const json = await res.json()
  self.setBalance(json.balance / 1000)

  const res2 = await fetch(
    `https://2342c8b04a.d.voltageapp.io/api/v1/payments`,
    {
      headers: {
        'X-Api-Key': key,
      },
    }
  )
  const json2 = await res2.json()
  self.setPayments(json2)

  return true
}
