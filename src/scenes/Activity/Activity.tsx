import { useNavigation } from '@react-navigation/native'
import { formatDistance } from 'date-fns/esm'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import API from '../../API/API'
import Avatar from '../../core/Avatar'
import Header from '../../core/Header'
import ListItem from '../../core/ListItem'
import Typography from '../../core/Typography'
import { useTheme } from '../../hooks/useTheme'

export default function Activity() {
  const queryClient = useQueryClient()
  const { push } = useNavigation()
  const { colors } = useTheme()
  const { data: notifications, isLoading, refetch } = useQuery('notifications', API.Activity.getMyNotifications)
  const { mutate: markAsRead } = useMutation(API.Activity.markMyNotificationsAsRead, {
    onSuccess: () => queryClient.invalidateQueries('notifications'),
  })

  useEffect(() => {
    setTimeout(() => {
      markAsRead()
    }, 3000);
  }, [])

  return (
    <>
      <Header title='Activity' />
      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}
      {!isLoading && (
        <FlatList
          refreshControl={(
            <RefreshControl
              colors={[colors.text]}
              tintColor={colors.text}
              refreshing={isLoading}
              onRefresh={refetch}
            />
          )}
          data={notifications}
          keyExtractor={item => item?._id}
          renderItem={({ item }) => {
            const isRead = item?.readAt

            const handlePress = () => {
              markAsRead()
              switch (item?.type) {
                case 'FOLLOW': return push('User Profile', { userID: item?.byUser?._id })
              }
            }

            return (
              <ListItem
                onPress={handlePress}
                renderBefore={<Avatar size='m' uri={item?.byUser?.avatar} />}
                label={item?.title}
                primary={item?.body}
                renderAfter={(
                  <View style={{ position: 'absolute', top: 8, right: 8 }}>
                    <Typography
                      variant='h6'
                      color='secondary'
                    >
                      {formatDistance(Date.parse(item?.createdAt), Date.now())} ago
                  </Typography>
                    {!isRead && (
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          marginTop: 4,
                          backgroundColor: colors.primary,
                          height: 8,
                          width: 8,
                          borderRadius: 4
                        }}
                      />
                    )}
                  </View>
                )}
              />
            )
          }}
        />
      )}
    </>
  )
}
