import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import API from '../../API/API'
import PrimaryButton from '../../core/PrimaryButton'
import  { useStreamID } from '../../hooks/useStream'
import useStreams from '../../hooks/useStreams'
import { useUser } from '../../hooks/useUser'

export default function StreamStartButton() {
  const { navigate } = useNavigation()
  const { refetchStreams } = useStreams()
  const streamID = useStreamID()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const handlePress = async () => {
    setIsLoading(true)
    const newStream = await API.Streams.createStream({
      meta: {
        name: '',
        description: '',
        imageURI: user?.avatar,
      },
      isLive: true
    })

    setIsLoading(false)
    navigate('Stream', {
      screen: 'Stream',
      params: { streamID: newStream?._id }
    })
    refetchStreams()
  }

  if (!!streamID) return null;

  return (
    <PrimaryButton
      title={isLoading ? '' : 'Go Live'}
      onPress={handlePress}
      style={styles.button}
      size='s'
      renderBefore={isLoading ? <ActivityIndicator style={styles.icon} size={18} color='#fff' /> : null}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: 88,
    borderRadius: 24,
    marginRight: 12,
  },

  icon: {
    marginRight: 8
  }
})
