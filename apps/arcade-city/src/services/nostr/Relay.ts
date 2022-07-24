import { display } from 'lib'

export class Relay {
  read: boolean | undefined = undefined
  write: boolean | undefined = undefined
  url: string

  constructor(url: string) {
    this.url = url
    display({ name: 'Nostr Relay', value: url, preview: `Added relay ${url}` })
  }
}
