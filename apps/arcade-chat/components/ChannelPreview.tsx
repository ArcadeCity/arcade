import { color, palette, spacing, typography } from '@arcadecity/ui'
import { Channel, setActiveChannelId, useLastChannelMessage } from '@arcadecity/use-arcade'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ChannelAvatar } from './ChannelAvatar'

export const ChannelPreview = ({ channel }: { channel: Channel }) => {
  const navigation = useNavigation()
  const navToIt = useCallback(() => {
    setActiveChannelId(channel.id)
    navigation.navigate('channel', { channelId: channel.id })
  }, [channel.id])

  const lastMessage = useLastChannelMessage(channel.id)
  const lastMessageText = lastMessage?.text ?? '-'
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={channel.id}
      onPress={navToIt}
      style={styles.container}>
      <ChannelAvatar channel={channel} />
      <View style={styles.contentContainer}>
        <Text style={styles.channelName}>{channel.name}</Text>
        <Text style={styles.channelPreview}>{lastMessageText}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  channelName: {
    color: palette.moonRaker,
    fontFamily: typography.secondary,
    paddingHorizontal: spacing[2],
    paddingTop: 1,
  },
  channelPreview: {
    color: palette.blueBell,
    fontFamily: typography.primary,
    fontSize: 12,
    paddingHorizontal: spacing[2],
    paddingTop: 4,
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    flex: 1,
    flexDirection: 'row',
    padding: spacing[3],
  },
  contentContainer: { flex: 1 },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: { fontSize: 14, fontWeight: '700' },
})
