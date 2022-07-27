import { RootStore, RootStoreModel } from 'stores'
import { AuthedPlayer } from 'stores/auth-store'
import { Chatroom, MessageModel } from 'stores/chat-store'
import { Guild, GuildModel } from 'stores/guild-store'
import { Player, PlayerModel } from 'stores/player-store'
import {
    Address, AddressModel, ServiceRequest, ServiceRequestModel,
    ServiceRequestStatus
} from 'stores/service-store'
import {
    MONARCH_COORDS, UNIVERSITY_COOP_COORDS
} from 'stores/service-store/dummy-data'

export const rootStore = RootStoreModel.create() as RootStore

export const authedPlayer: AuthedPlayer = {
  // acceptedTerms: new Date().toString(),
  id: 1, // switch to 2 to test RequestStatusBar story with driver seeing navigate button
  bio: 'Me is authedPlayer',
  // invited: true,
  // invites: 3,
  level: 0,
  onboarded: true,
  profession: 'Driver',
  // profilePicture: 'https://placekitten.com/200/300',
  // referrer_user_id: 1,
  username: 'bobbo',
  locale: null,
}

export const player1: Player = PlayerModel.create({
  id: 1,
  bio: 'Test player1',
  city: 'Austin, TX, US',
  guildRole: 'Founder',
  level: 0,
  nearby: false,
  profession: 'Driver',
  profilePicture: 'https://placekitten.com/200/300',
  username: 'bobbo',
})

export const message = {
  id: 1,
  text: 'Test message',
  chatroomId: 1,
  userId: 1,
  createdAt: new Date(),
  // player: player1,
}

export const messageModel = MessageModel.create({
  id: 1,
  text: 'Test message',
  chatroomId: 1,
  userId: 1,
  createdAt: new Date(),
  // player: player1,
})

export const chatroom: Chatroom = {
  id: 1,
  createdAt: new Date(),
  // @ts-ignore
  messages: [message],
  name: 'Test',
  type: 'region',
  prettyName: 'Test',
  user1id: null,
  user2id: null,
}

const pickup = {
  id: 'address1',
  type: 'pickup',
  coords: MONARCH_COORDS,
  prettyName: '123 Hello Street',
  waypointNum: 0,
}

const drop: Address = {
  id: 'address2',
  type: 'drop',
  coords: UNIVERSITY_COOP_COORDS,
  prettyName: '123 Whatever Street',
  waypointNum: 0,
}

export const rider1: Player = PlayerModel.create({
  id: 1,
  bio: 'Test player1',
  city: 'Austin, TX, US',
  guildRole: '--',
  level: 0,
  nearby: true,
  profession: 'Rider',
  profilePicture: 'https://randomuser.me/api/portraits/women/31.jpg',
  username: 'Jane Rider',
})

export const driver2: Player = PlayerModel.create({
  id: 2,
  bio: 'Test driverrrrrr',
  city: 'Austin, TX, US',
  guildRole: '--',
  level: 2,
  nearby: false,
  profession: 'Driver',
  profilePicture: 'https://randomuser.me/api/portraits/men/87.jpg',
  username: 'Joe Driver',
})

export const requestUnconfirmed: ServiceRequest = ServiceRequestModel.create({
  id: 1,
  status: ServiceRequestStatus.UNCONFIRMED,
  type: 'ride',
  createdAt: new Date(),
  when: new Date(),
  paymentMethod: 'cash',
  playerRequesting: 1,
  details: '',
  addresses: [AddressModel.create(pickup), AddressModel.create(drop)],
})

export const requestUnclaimed: ServiceRequest = ServiceRequestModel.create({
  id: 2,
  status: ServiceRequestStatus.AWAITING_DRIVERS,
  type: 'ride',
  createdAt: new Date(),
  when: new Date(),
  paymentMethod: 'cash',
  playerRequesting: 1,
  details: 'On the corner with a red suitcase!',
  addresses: [AddressModel.create(pickup), AddressModel.create(drop)],
  chatroom: chatroom.id,
})

export const requestClaimed: ServiceRequest = ServiceRequestModel.create({
  id: 3,
  status: ServiceRequestStatus.CLAIMED,
  type: 'ride',
  createdAt: new Date(),
  when: new Date(),
  paymentMethod: 'cash',
  playerRequesting: 1,
  playerClaiming: 2,
  details: 'On the corner with a red suitcase!',
  addresses: [AddressModel.create(pickup), AddressModel.create(drop)],
})

export const requestResolvedByRider: ServiceRequest =
  ServiceRequestModel.create({
    id: 4,
    status: ServiceRequestStatus.RESOLVED_BY_RIDER,
    type: 'ride',
    createdAt: new Date(),
    when: new Date(),
    paymentMethod: 'cash',
    playerRequesting: 1,
    playerClaiming: 2,
    details: 'On the corner with a red suitcase!',
    addresses: [AddressModel.create(pickup), AddressModel.create(drop)],
  })

export const requestCancelledByRider: ServiceRequest =
  ServiceRequestModel.create({
    id: 5,
    status: ServiceRequestStatus.CANCELLED_BY_RIDER,
    type: 'ride',
    createdAt: new Date(),
    when: new Date(),
    paymentMethod: 'cash',
    playerRequesting: 1,
    playerClaiming: 2,
    details: 'On the corner with a red suitcase!',
    addresses: [AddressModel.create(pickup), AddressModel.create(drop)],
  })

export const guild1: Guild = GuildModel.create({
  id: 1,
  name: 'Super Awesome Test Guild',
  mission: 'Awesome mission',
  centerCoords: {
    latitude: 30,
    longitude: -97,
  },
  establishedAt: Date.now(),
  members: {
    1: 1,
    2: 2,
  },
})
