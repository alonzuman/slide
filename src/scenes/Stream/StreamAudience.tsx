import React from 'react'
import { View } from 'react-native'
import Constants from '../../constants/Constants'
import AvatarsGroup from '../../core/AvatarsGroup'
import IconButton from '../../core/IconButton'
import Typography from '../../core/Typography'
import useStreamLayout from '../../hooks/useStreamLayout'
import { useStreamAudience, useStreamMembers, useStreamRaisedHands } from '../../hooks/useStream'
import { useTheme } from '../../hooks/useTheme'

export default function StreamAudience() {
  const audience = useStreamAudience()
  const raisedHands = useStreamRaisedHands()
  const members = useStreamMembers()
  const { openModal } = useStreamLayout()
  const { colors } = useTheme()

  // Get only the raised hands that are by people in the stream
  const activeRaisedHands = raisedHands?.filter(v => members?.includes(v))

  const handlePress = () => openModal(Constants.StreamModals.AUDIENCE)

  return (
    <View style={{ position: 'relative' }}>
      <AvatarsGroup
        onPress={handlePress}
        users={audience}
        max={2}
        borderColor={colors.border}
      />
      {activeRaisedHands?.length > 0 && (
        <IconButton onPress={handlePress} style={{ position: 'absolute', top: -8, right: -8 }} size='xs' card>
          <Typography style={{ fontSize: 12 }}>👋</Typography>
        </IconButton>)}
    </View>
  )
}
